# KeepinApp

App for user functionality on the keepin it clean website. The application is built on the MEAN stack with express/node, mongoose/mongo, and an Angular front-end. The app uses bootstrap for design, JWT and bcrypt for user/session security and management.

Features:
Ability for public access to create a user profile
User will have a login ability with a profile they can view/edit
User profile page may have a small google maps window to give a view of address on map
User will the ability to view upcoming / recurring appointments, edit existing appointments, and request new appointments
Admin will have an online interface and will receive email notifications for specific events

Views:
new user (/new-user) - new user can sign up to have a profile
login (/login) - user login page with forgot password and new user link

user profile (/profile) - base page for a user, has a small 'my info' box that can be used to edit info, small box for recurring/upcoming appointments, button to link to new request page

new request (/user/getclean)
feedback (/user/feedback)
site admin user management (/userAdmin) - admin user can view/manage profiles, can view existing/recurring apointments and confirm adjustments and creation requests
privac statement - (/privacy) standard terms and conditions/privacy statement for compliance



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
