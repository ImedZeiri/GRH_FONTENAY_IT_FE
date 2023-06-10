import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Users } from "../../services/users";
import {SkillsService} from "../../services/skills.service";
import {UserSkill} from "../../services/UserSkill";

@Component({
  selector: 'app-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  userSkills: UserSkill[];
  userSkillsIdArray: FormArray;

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Users },
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private skillsService: SkillsService

  ) {
    this.editForm = this.formBuilder.group({
      email: [data.user.email, Validators.required],
      roles: [data.user.roles, Validators.required],
      account_status: [data.user.account_status === 1 ? 1 : 0, Validators.required],
      userSkillsId: this.formBuilder.array([])
    });
    this.userSkillsIdArray = this.editForm.get('userSkillsId') as FormArray;
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedUser: Users = {
        ...this.data.user,
        email: this.editForm.value.email,
        roles: this.editForm.value.roles,
        account_status: this.editForm.value.account_status === 1 ? 1 : 0,
        accountStatus: this.editForm.value.account_status === 1 ? 1 : 0,
        userSkillsId: this.editForm.value.userSkillsId,
      };
      this.usersService.updateUser(updatedUser.id, updatedUser).subscribe(
        () => {
          this.dialogRef.close(updatedUser);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getSkills() {
    this.skillsService.getSkills().subscribe((res) => {
      this.userSkills = res['hydra:member'];
      this.userSkills = this.mappingUserSkills(res['hydra:member']);
      this.userSkills = this.userSkills.filter(skill => skill.user === '/api/users/' + String(this.data.user.id));
      console.log(this.userSkills);
    });
  }

  private mappingUserSkills(data: any[]) {
    let newUserSkill = data.map(item => {
      return {
        ...item
      }
    })
    return newUserSkill;
  }

  addSkill(): void {
    const skillGroup = this.formBuilder.group({
      name: ['', Validators.required],
      rate: ['', Validators.required]
    });

    const skillIdControl = skillGroup.get('skillId');
    if (skillIdControl && skillIdControl.value) {
      const skill = this.userSkills.find(s => s.id === skillIdControl.value);
      if (skill) {
        skillGroup.patchValue({
          name: skill.name,
          rate: skill.rate
        });
      }
    }

    this.userSkillsIdArray.push(skillGroup);
  }


  removeSkill(index: number): void {
    this.userSkillsIdArray.removeAt(index);
  }


  ngOnInit(): void {
    this.getSkills();
  }

}
