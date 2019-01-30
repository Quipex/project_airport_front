import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {UsersService} from './services/users.service';
import {AuthenticationService} from './services/authentication.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AirlinesComponent} from './airlines/airlines.component';
import {AirlinesService} from './services/airlines.service';
import {AbstractCatalogComponent} from './shared/abstract-catalog/abstract-catalog.component';
import {TableLayoutComponent} from './shared/table-layout/table-layout.component';
import {CountriesComponent} from './countries/countries.component';
import {CountriesService} from './services/countries.service';
import {DynamicFormComponent} from './shared/dynamic-form/dynamic-form.component';
import {DynamicFormRenderComponent} from './shared/dynamic-form/dynamic-form-render.component';
import {httpInterceptorProviders} from './http-interceptors';
import {AirplanesComponent} from './airplanes/airplanes.component';
import {FormControlService} from './services/formControl.service';
import {
  MatButtonModule,
  MatButtonToggleModule, MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {BsDropdownModule} from 'ngx-bootstrap';
import {IntlTelInputModule} from 'angular-intl-tel-input';
import {PassengersComponent} from './users/passengers/passengers.component';
import {ExtraTypeComponent} from './extra-type/extra-type.component';
import {ExtraTypeService} from './services/extra-type.service';
import {ErrorTestComponent} from './error-test/error-test.component';
import {ErrorTestService} from './services/error-test.service';
import {PassengersService} from './services/passengers.service';
import {PassportsService} from './services/passports.service';
import {PlaneSeatsGridComponent} from './airplanes/seats/plane-seats-grid/plane-seats-grid.component';
import {SeatComponent} from './airplanes/seats/plane-seats-grid/seat-type-section/seat/seat.component';
import {MatDividerModule} from '@angular/material/divider';
import {PlaneSeatsEditorComponent} from './airplanes/plane-seats-editor/plane-seats-editor.component';
import {PlaneInfoComponent} from './airplanes/plane/plane-editor/plane-info/plane-info.component';
import {PlaneSeatsParametersComponent} from './airplanes/plane/plane-editor/plane-seats-parameters/plane-seats-parameters.component';
import {PlaneEditorComponent} from './airplanes/plane/plane-editor/plane-editor.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FlightsComponent} from './flights/flights.component';
import {NotFoundComponent} from './not-found-component/not-found-component.component';
import {TicketsComponent} from './tickets/tickets.component';
import {TicketsService} from './services/tickets.service';
import {RoleGuardService} from './services/roleGuard.service';
import {AuthGuardService} from './services/authGuard.service';
import {SeatColorService} from './airplanes/data/seat-colors.service';
import {SeatTypeColorpickerComponent} from './airplanes/plane/plane-editor/plane-seats-parameters/section-editor/seat-type-colorpicker/seat-type-colorpicker.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {UserFlightsComponent} from './users/user-flights/user-flights.component';
import {FlightsService} from './services/flights.service';
import {SeatTypeSectionComponent} from './airplanes/seats/plane-seats-grid/seat-type-section/seat-type-section.component';
import {ProfileComponent} from './profile/profile.component';
import {FlightBookingComponent} from './booking/flight-booking/flight-booking.component';
import {SectionEditorComponent} from './airplanes/plane/plane-editor/plane-seats-parameters/section-editor/section-editor.component';
import {MakeIterablePipe} from './airplanes/seats/plane-seats-grid/seat-type-section/make-iterable.pipe';
import {SeatEditorModalComponent} from './airplanes/seats/plane-seats-grid/seat-type-section/seat/seat-editor-modal/seat-editor-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AirplaneInfoComponent } from './airplanes/airplane-info/airplane-info.component';
import { SeatTypeComponent } from './seat-type/seat-type.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import {CreditCardDirectivesModule} from "ng2-cc-library";
import {PaymentService} from "./services/payment.service";
import { PaymentFormComponent } from './payment-form/payment-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UsersComponent,
    NavbarComponent,
    AirlinesComponent,
    CountriesComponent,
    AbstractCatalogComponent,
    TableLayoutComponent,
    DynamicFormComponent,
    DynamicFormRenderComponent,
    AirplanesComponent,
    PassengersComponent,
    ExtraTypeComponent,
    ErrorTestComponent,
    PlaneSeatsGridComponent,
    SeatComponent,
    PlaneSeatsEditorComponent,
    PlaneInfoComponent,
    PlaneSeatsParametersComponent,
    PlaneEditorComponent,
    ErrorTestComponent,
    FlightsComponent,
    NotFoundComponent,
    TicketsComponent,
    NotFoundComponent,
    SeatTypeColorpickerComponent,
    UserFlightsComponent,
    SeatTypeSectionComponent,
    ProfileComponent,
    FlightBookingComponent,
    SectionEditorComponent,
    MakeIterablePipe,
    SeatEditorModalComponent,
    AirplaneInfoComponent,
    SeatTypeComponent,
    PaymentMethodsComponent,
    PaymentFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatRadioModule,
    BsDropdownModule.forRoot(),
    IntlTelInputModule,
    MatSelectModule,
    MatDividerModule,
    MatSidenavModule,
    MatGridListModule,
    NgbModule,
    MatSlideToggleModule,
    CreditCardDirectivesModule,
    MatCardModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [UsersService,
    AirlinesService,
    CountriesService,
    httpInterceptorProviders,
    FormControlService,
    AuthenticationService,
    PassengersService,
    ExtraTypeService,
    PassportsService,
    ErrorTestService,
    SeatColorService,
    FlightsService,
    TicketsService,
    RoleGuardService,
    AuthGuardService,
    PaymentService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SeatEditorModalComponent]
})

export class AppModule {
}
