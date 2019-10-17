import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './routing/routing.module';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { GradeComponent } from './grade/grade.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { InstructorFormComponent } from './instructor-form/instructor-form.component';
import { MajorFormComponent } from './major-form/major-form.component';
import { MajorClassFormComponent } from './major-class-form/major-class-form.component';
import { StudentClassFormComponent } from './student-class-form/student-class-form.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { MajorClassComponent } from './major-class/major-class.component';
import { MajorComponent } from './major/major.component';
import { InstructorComponent } from './instructor/instructor.component';
import { ClassComponent } from './class/class.component';
import { FooterComponent } from './components/footer/footer.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StudentComponent,
    HomeComponent,
    DeleteConfirmComponent,
    StudentFormComponent,
    GradeComponent,
    GradeFormComponent,
    ClassFormComponent,
    AssignmentFormComponent,
    InstructorFormComponent,
    MajorFormComponent,
    MajorClassFormComponent,
    StudentClassFormComponent,
    StudentClassComponent,
    MajorClassComponent,
    MajorComponent,
    InstructorComponent,
    AssignmentComponent,
    ClassComponent,
    FooterComponent
  ],
  exports: [
      CdkTableModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    CdkTableModule
  ],
  entryComponents: [DeleteConfirmComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
