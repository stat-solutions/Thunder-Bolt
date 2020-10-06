"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReduceRateComponent = void 0;
var core_1 = require("@angular/core");
var jwt_decode = require("jwt-decode");
var forms_1 = require("@angular/forms");
var custom_validator_1 = require("src/app/validators/custom-validator");
var ReduceRateComponent = /** @class */ (function () {
    function ReduceRateComponent(authService, router, spinner, alertService, modalService) {
        this.authService = authService;
        this.router = router;
        this.spinner = spinner;
        this.alertService = alertService;
        this.modalService = modalService;
        this.posted = false;
        this.user = '/../../../assets/img/man.svg';
    }
    ReduceRateComponent.prototype.ngOnInit = function () {
        this.getTheNumberPlates();
        this.userForm = this.createFormGroup();
        this.checkedOk = false;
    };
    ReduceRateComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            loanType: new forms_1.FormControl(['',
                forms_1.Validators.required]),
            number_plate: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(8),
                forms_1.Validators.maxLength(8)
            ])),
            user_contact_number: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/, { hasNumber: true })
            ])),
            itemRate: new forms_1.FormControl({ value: '', disabled: true }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.maxValue(100)
            ])),
            pin: new forms_1.FormControl({ value: '', disabled: true }, forms_1.Validators.compose([
                forms_1.Validators.required,
                custom_validator_1.CustomValidator.patternValidator(/\d/, { hasNumber: true }),
                forms_1.Validators.maxLength(4),
                forms_1.Validators.minLength(4)
            ]))
        });
    };
    ReduceRateComponent.prototype.checkLoanType = function (value) {
        // console.log(value);
        this.loanType = value;
    };
    ReduceRateComponent.prototype.revert = function () {
        this.userForm.reset();
    };
    ReduceRateComponent.prototype.refresh = function () {
        location.reload();
    };
    Object.defineProperty(ReduceRateComponent.prototype, "fval", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ReduceRateComponent.prototype.onKey = function (event) {
        // without type info
        this.values = event.target.value.replace(/[\D\s\._\-]+/g, '');
        this.numberValue = this.values ? parseInt(this.values, 10) : 0;
        // tslint:disable-next-line:no-unused-expression
        this.values =
            this.numberValue === 0 ? '' : this.numberValue.toLocaleString('en-US');
        this.userForm.controls.amount_to_pay.setValue(this.values);
    };
    ReduceRateComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'modal-lg modal-dialog-centered' }));
    };
    ReduceRateComponent.prototype.getTheNumberPlates = function () {
        // this.pumpService.theNumberPlates(this.station).subscribe(
        //   data => {
        //     this.numberPlates = data;
        //   },
        //   (error: string) => {
        //     this.errored = true;
        //     this.serviceErrors = error;
        //     this.alertService.danger({
        //       html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
        //     });
        //   }
        // );
    };
    ReduceRateComponent.prototype.reduceRate = function () {
        this.userForm.patchValue({
            amount_to_pay: parseInt(this.userForm.controls.amount_to_pay.value.replace(/[\D\s\._\-]+/g, ''), 10)
        });
        // tslint:disable-next-line:triple-equals
        if (!(this.secretPin == this.userForm.controls.pin.value)) {
            this.alertService.danger({
                html: '<b>Invalid PIN!</b>'
            });
            return;
        }
        else {
            if (this.userForm.controls.amount_to_pay.value > this.loanLimit) {
                this.alertService.warning({
                    html: '<b>Loan Limit Exceeded!</b>' + '<br/>'
                });
                return;
            }
            else {
                this.userForm.controls.number_plate.enable();
                this.userForm.patchValue({
                    user_station: jwt_decode(this.authService.getJwtToken()).user_station,
                    user_id: jwt_decode(this.authService.getJwtToken()).user_id
                });
                // console.log(this.userForm.value);
                this.posted = true;
                this.spinner.show();
                // this.pumpService.createLoan(this.userForm).subscribe(
                //   result => {
                //     this.amountDue = result[0].amount_due;
                //     this.txnId = result[0].txn_id;
                //     this.spinner.hide();
                //     this.openModal();
                //     this.router.navigate(['dashboardpump/shiftmanagement']);
                //     setTimeout(() => {
                //       location.reload();
                //     }, 3000);
                //   },
                //   (error: string) => {
                //     this.spinner.hide();
                //     this.errored = true;
                //     this.serviceErrors = error;
                //     this.alertService.danger({
                //       html: '<b>' + this.serviceErrors + '</b>' + '<br/>'
                //     });
                //   }
                // );
            }
        }
    };
    ReduceRateComponent = __decorate([
        core_1.Component({
            selector: 'app-reduce-rate',
            templateUrl: './reduce-rate.component.html',
            styleUrls: ['./reduce-rate.component.scss']
        })
    ], ReduceRateComponent);
    return ReduceRateComponent;
}());
exports.ReduceRateComponent = ReduceRateComponent;
