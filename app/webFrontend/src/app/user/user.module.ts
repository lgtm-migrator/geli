import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserDetailsComponent} from './user-details/user-details.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserReportComponent} from './user-report/user-report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    UserRoutingModule,
  ],
  declarations: [
    UserDetailsComponent,
    UserEditComponent,
    UserReportComponent,
    UserProfileComponent
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserModule {
}
