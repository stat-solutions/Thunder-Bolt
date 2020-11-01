"use strict";
exports.__esModule = true;
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var select_the_Area_component_1 = require("./select-the-Area.component");
describe('SelectTheTownComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [select_the_Area_component_1.SelectTheAreaComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(select_the_Area_component_1.SelectTheAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
