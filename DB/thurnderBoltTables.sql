CREATE TABLE If NOT EXISTS approvalDetails (
    approvalDetailsId INT NOT NULL AUTO_INCREMENT ,
    createdBy VARCHAR(100) NOT NULL,
    firstApprovedBy VARCHAR(100),
    secondApprovedBy VARCHAR(100),
    thirdApprovedBy VARCHAR(100),
    fouthApprovedBy VARCHAR(100),
    fifthApprovedBy VARCHAR(100),

    createdByAt VARCHAR(100) NOT NULL,
    firstApprovedByAt VARCHAR(100),
    secondApprovedByAt VARCHAR(100),
    thirdApprovedByAt VARCHAR(100),
    fouthApprovedByAt VARCHAR(100),
    fifthApprovedByAt VARCHAR(100),

    updatedBy VARCHAR(100) NOT NULL,
    firstUpdateApprovedBy VARCHAR(100),
    secondUpdateApprovedBy VARCHAR(100),
    thirdUpdateApprovedBy VARCHAR(100),
    fouthUpdateApprovedBy VARCHAR(100),
    fifthUpdateApprovedBy VARCHAR(100),

    updatedByAt VARCHAR(100) NOT NULL,
    firstUpdateApprovedByAt VARCHAR(100),
    secondUpdateApprovedByAt VARCHAR(100),
    thirdUpdateApprovedByAt VARCHAR(100),
    fouthUpdateApprovedByAt VARCHAR(100),
    fifthUpdateApprovedByAt VARCHAR(100), 
    PRIMARY KEY (approvalDetailsId)
) 
ENGINE = InnoDB
AUTO_INCREMENT = 100
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS accessRights (
    accessRightsId INT NOT NULL,
    roleName VARCHAR(100), -- CENTRAL_MANAGER, AREA_MANAGER, TOWN_MANAGER, STATION_MANAGER, STATION_OFFICER,USER_REGISTRATION,
    PRIMARY KEY (accessRightsId)
)
ENGINE = InnoDB
AUTO_INCREMENT = 200
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS itemRequiringApprovalCreate (
    itemRequiringApprovalId INT NOT NULL,
    itemName VARCHAR(100), -- COMPANY_CREATION,BUSINESSUNIT_CREATION,AREA_CREATION,TOWN_CREATION,STAION_CREATION,
    itemStatus INT,--1=FIRST_APPROVAL,2=SECOND_APPROVAL,3=THIRD_APPROVAL,4=FOURTH_APPROVAL,5=FIFTH_APPROVAL
    PRIMARY KEY (itemRequiringApprovalId)
)
ENGINE = InnoDB
AUTO_INCREMENT = 300
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS itemRequiringApprovalUpdate (
    itemRequiringApprovalId INT NOT NULL,
    itemName VARCHAR(100), -- COMPANY_UPDATE,BUSINESSUNIT_UPDATE,
    itemStatus INT,--1=FIRST_APPROVAL,2=SECOND_APPROVAL,3=THIRD_APPROVAL,4=FOURTH_APPROVAL,5=FIFTH_APPROVAL
    PRIMARY KEY (itemRequiringApprovalId)
)
ENGINE = InnoDB
AUTO_INCREMENT = 400
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS company (
    companyId INT NOT NULL AUTO_INCREMENT,
    companyName VARCHAR(100),
    companyBoxNumber VARCHAR(100),
    companyCityLocation  VARCHAR(100),
    companyCountryLocation  VARCHAR(100),
    companyRegionLocation  VARCHAR(100),
    companyOfficeFloor  VARCHAR(100),
    companyPlotNumber   VARCHAR(100),
    companyStreetBuilding  VARCHAR(100),
    companyEmail1  VARCHAR(100),
     companyEmail2  VARCHAR(100),
    companyPhoneContact1  VARCHAR(100),
    companyPhoneContact2  VARCHAR(100),
    companyLogoUrl   VARCHAR(100),
    fkApprovalDetailsIdCompany INT NULL, 
    PRIMARY KEY(companyId), 
    CONSTRAINT fkApprovalDetailsIdCompany FOREIGN KEY(fkApprovalDetailsIdCompany)
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 500
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkApprovalDetailsIdCompanyIndex ON company(fkApprovalDetailsIdCompany ASC ) VISIBLE;

CREATE TABLE IF NOT EXISTS businessUnit (
    businnessUnitId INT NOT NULL AUTO_INCREMENT,
    bussinessUnitName VARCHAR(100) DEFAULT 'HEADOFFICEBUSINESSUNIT',
    bussinessUnitStatus INT,-- 1=CREATED,2=APPROVED,3=DEACTIVATED
    fkApprovalDetailsIdBusinessUnit INT NULL,
    PRIMARY KEY (businnessUnitsId),
    CONSTRAINT fkApprovalDetailsIdBusinessUnit FOREIGN KEY(fkApprovalDetailsIdBusinessUnit) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkApprovalDetailsIdBusinessUnitIndex ON businessUnit(fkApprovalDetailsIdBusinessUnit ASC ) VISIBLE;



CREATE TABLE IF NOT EXISTS theBusinessUnit (
    theBusinessUnitId INT NOT NULL AUTO_INCREMENT,
   fkBusinnessUnitIdTheBusinessUnit INT  NULL,
   fkCompanyIdTheBusinessUnit INT  NULL,
     PRIMARY KEY (theBusinessUnitId),

   CONSTRAINT fkBusinnessUnitIdTheBusinessUnit FOREIGN KEY (fkBusinnessUnitIdTheBusinessUnit) 
   REFERENCES businessUnit (businnessUnitId) ON DELETE CASCADE ON UPDATE NO ACTION,

   CONSTRAINT fkCompanyIdTheBusinessUnit FOREIGN KEY (fkCompanyIdTheBusinessUnit) 
   REFERENCES company (companyId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 1100
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkBusinnessUnitIdTheBusinessUnitIndex ON theBusinessUnit(fkBusinnessUnitIdTheBusinessUnit ASC ) VISIBLE;
CREATE INDEX fkCompanyIdTheBusinessUnitIndex ON theBusinessUnit(fkCompanyIdTheBusinessUnit ASC ) VISIBLE;



CREATE TABLE IF NOT EXISTS areaRegion (
    areaRegionId INT NOT NULL AUTO_INCREMENT ,
    areaRegionName VARCHAR(100) DEFAULT 'HEADOFFICEAREA',
      areaRegionStatus INT,-- 1=CREATED,2=APPROVED,3=DEACTIVATED
    fkApprovalDetailsIdAreaRegion INT NULL,
    PRIMARY KEY (areaRegionId ),
      CONSTRAINT fkApprovalDetailsIdAreaRegion FOREIGN KEY(fkApprovalDetailsIdAreaRegion) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 700
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkApprovalDetailsIdAreaRegionIndex ON areaRegion(fkApprovalDetailsIdAreaRegion ASC ) VISIBLE;



CREATE TABLE IF NOT EXISTS theAreaRegion (
    theAreaRegionId INT NOT NULL AUTO_INCREMENT,
    fkAreaRegionIdTheAreaRegion INT NULL,
    fkTheBusinessUnitIdTheAreaRegion INT NULL,
      PRIMARY KEY (theAreaRegionId),

    CONSTRAINT fkAreaRegionIdTheAreaRegion FOREIGN KEY (fkAreaRegionIdTheAreaRegion) 
    REFERENCES areaRegion (areaRegionId) ON DELETE CASCADE ON UPDATE NO ACTION,

        CONSTRAINT fkTheBusinessUnitIdTheAreaRegion FOREIGN KEY (fkTheBusinessUnitIdTheAreaRegion) 
    REFERENCES theBusinessUnit (theBusinessUnitId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE INDEX fkAreaRegionIdTheAreaRegionIndex ON theAreaRegion(fkAreaRegionIdTheAreaRegion ASC ) VISIBLE;
CREATE INDEX fkTheBusinessUnitIdTheAreaRegionIndex ON theAreaRegion(fkTheBusinessUnitIdTheAreaRegion ASC ) VISIBLE;







CREATE TABLE IF NOT EXISTS town (
    townId INT NOT NULL AUTO_INCREMENT ,
    townName VARCHAR(100) DEFAULT 'HEADOFFICETOWN',
     townStatus INT,-- 1=CREATED,2=APPROVED,3=DEACTIVATED
    fkApprovalDetailsIdTown INT NULL,
    PRIMARY KEY (townId ),
      CONSTRAINT fkApprovalDetailsIdTown FOREIGN KEY(fkApprovalDetailsIdTown) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 700
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkApprovalDetailsIdTownIndex ON town(fkApprovalDetailsIdTown ASC ) VISIBLE;



CREATE TABLE IF NOT EXISTS theTown (
    theTownId INT NOT NULL AUTO_INCREMENT,
    fkTownIdTheTown INT NULL,
    fkTheAreaRegionIdTheTown INT NULL,
      PRIMARY KEY (theTownId),

    CONSTRAINT fkTownIdTheTown FOREIGN KEY (fkTownIdTheTown) 
    REFERENCES town (townId) ON DELETE CASCADE ON UPDATE NO ACTION,

        CONSTRAINT fkTheAreaRegionIdTheTown FOREIGN KEY (fkTheAreaRegionIdTheTown) 
    REFERENCES theAreaRegion (theAreaRegionId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE INDEX fkTownIdTheTownIndex ON theTown(fkTownIdTheTownIndex ASC ) VISIBLE;
CREATE INDEX fkTheAreaRegionIdTheTownIndex ON theTown(fkTheAreaRegionIdTheTown ASC ) VISIBLE;





CREATE TABLE IF NOT EXISTS station (
    stationId INT NOT NULL AUTO_INCREMENT ,
   stationName VARCHAR(100) DEFAULT 'HEADOFFICESTATION',
     stationStatus INT,-- 1=CREATED,2=APPROVED,3=DEACTIVATED
    fkApprovalDetailsIdStation INT NULL,
    PRIMARY KEY (stationId),
      CONSTRAINT fkApprovalDetailsIdStation FOREIGN KEY(fkApprovalDetailsIdStation) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 700
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkApprovalDetailsIdStationIndex ON station(fkApprovalDetailsIdStation ASC ) VISIBLE;



CREATE TABLE IF NOT EXISTS theStation (
    theStationId INT NOT NULL AUTO_INCREMENT,
    fkStationIdTheStation INT NULL,
    fkTheTownIdTheStation INT NULL,
      PRIMARY KEY (theStationId),

    CONSTRAINT fkStationIdTheStation FOREIGN KEY (fkStationIdTheStation) 
    REFERENCES station (stationId) ON DELETE CASCADE ON UPDATE NO ACTION,

        CONSTRAINT fkTheTownIdTheStation FOREIGN KEY (fkTheTownIdTheStation) 
    REFERENCES theTown (theTownId) ON DELETE CASCADE ON UPDATE NO ACTION

)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;


CREATE INDEX fkStationIdTheStationIndex ON theStation(fkStationIdTheStation ASC ) VISIBLE;
CREATE INDEX fkTheTownIdTheStationIndex ON theStation(fkTheTownIdTheStation ASC ) VISIBLE;





CREATE TABLE IF NOT EXISTS user (
    userId INT NOT NULL AUTO_INCREMENT ,
    userName VARCHAR(100)  NULL,
    userEmail1 VARCHAR(100)  NULL,
    userEmail2 VARCHAR(100)  NULL,
    userPhone1 VARCHAR(100)  NULL,
    userPhone2 VARCHAR(100)  NULL,
    userIdType VARCHAR(100)  NULL,-- NATIONAL ID,PASSPORT,DRIVING PERMIT,VILLAGE ID
    userIdNumber VARCHAR(100) NULL,
    userPhotoUrl VARCHAR(100) NULL,
    userHomeAreaDetails VARCHAR(500)  NULL,
    userDateOfBirth DATE,
    userRecruitmentDate DATE,
    userPassword VARCHAR(200)  NULL,
    userStatus INT,-- 1=CREATED,2=APPROVED,3=DEACTIVATED
    fkTheStationIdUser  INT  NULL,
    fkApprovalDetailsIdUser  INT  NULL,
    fkAccessRightsIdUser  INT  NULL,
    PRIMARY KEY (userId),

    
    CONSTRAINT fkTheStationIdUser FOREIGN KEY (fkTheStationIdUser) 
    REFERENCES theStation (theStationId) ON DELETE CASCADE ON UPDATE NO ACTION,

        CONSTRAINT fkApprovalDetailsIdUser FOREIGN KEY (fkApprovalDetailsIdUser) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION,

            CONSTRAINT fkAccessRightsIdUser FOREIGN KEY (fkAccessRightsIdUser) 
    REFERENCES accessRights (accessRightsId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;


CREATE INDEX fkTheStationIdUserIndex ON user(fkTheStationIdUser ASC ) VISIBLE;

CREATE INDEX fkApprovalDetailsIdUserIndex ON user(fkApprovalDetailsIdUser ASC ) VISIBLE;

CREATE INDEX fkAccessRightsIdUserIndex ON user(fkAccessRightsIdUser ASC ) VISIBLE;



CREATE TABLE IF NOT EXISTS userNextOfKin (
    userNextOfKinId INT NOT NULL AUTO_INCREMENT ,
    userNextOfKinName VARCHAR(100)  NULL,
    userNextOfKinEmail1 VARCHAR(100)  NULL,
    userNextOfKinPhone1 VARCHAR(100)  NULL,
   userNextOfKinPhone2 VARCHAR(100)  NULL,
   userNextOfKinIdType VARCHAR(100)  NULL,
  userNextOfKinIdNumber VARCHAR(100) NULL,
   userNextOfKinPhotoUrl VARCHAR(100) NULL,
   userNextOfKinHomeAreaDetails VARCHAR(500)  NULL,
   userNextOfKinDateOfBirth DATE,
    fkUserIdUserNextOfKin INT  NULL,
    PRIMARY KEY (userNextOfKinId),
    
    CONSTRAINT fkUserIdUserNextOfKin FOREIGN KEY (fkUserIdUserNextOfKin) 
    REFERENCES user (userId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;


CREATE INDEX fkUserIdUserNextOfKinIndex ON user(fkUserIdUserNextOfKin ASC ) VISIBLE;


CREATE TABLE IF NOT EXISTS loggedInUsers (
    loggedInUsersId INT NOT NULL AUTO_INCREMENT ,
    logInTime TIMESTAMP   NULL,
    logOutTime TIMESTAMP  NULL,
    logInStatus VARCHAR(100)  NULL,-- 1=ONLINE,2=OFFLINE
    fkUserIdloggedInUsers INT  NULL,
    PRIMARY KEY (loggedInUsersId),
    
    CONSTRAINT fkUserIdloggedInUsers FOREIGN KEY (fkUserIdloggedInUsers) 
    REFERENCES user (userId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkUserIdloggedInUsersIndex ON user(fkUserIdloggedInUsers ASC ) VISIBLE;



CREATE TABLE IF NOT EXISTS customer (
   customerId INT NOT NULL AUTO_INCREMENT,
    customerName VARCHAR(100)  NULL,
    customerPhone1 VARCHAR(100)  NULL,
    customerPhone2 VARCHAR(100)  NULL,
    customerIdType VARCHAR(100)  NULL,
    customerIdNumber VARCHAR(100)  NULL,
    customerSecretPin INT  NULL,
    customerPhotoUrl VARCHAR(100) NULL,
    customerHomeAreaDetails VARCHAR(500)  NULL,
    customerComment  TINYTEXT  NULL,
    fkApprovalDetailsIdCustomer INT NULL,
    fkUserIdCustomer INT NULL,
    PRIMARY KEY (customerId),

  CONSTRAINT fkApprovalDetailsIdCustomer FOREIGN KEY(fkApprovalDetailsIdCustomer) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION,

      CONSTRAINT fkUserIdCustomer FOREIGN KEY(fkUserIdCustomer) 
    REFERENCES user (userId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkApprovalDetailsIdCustomerIndex ON user(fkApprovalDetailsIdCustomer ASC ) VISIBLE;

CREATE INDEX fkUserIdCustomerIndex ON user(fkUserIdCustomer ASC ) VISIBLE;




CREATE TABLE IF NOT EXISTS customerNextOfKin (
    customerNextOfKinId INT NOT NULL AUTO_INCREMENT ,
    customerNextOfKinName VARCHAR(100)  NULL,
    customerNextOfKinEmail1 VARCHAR(100)  NULL,
    customerNextOfKinPhone1 VARCHAR(100)  NULL,
   customerNextOfKinPhone2 VARCHAR(100)  NULL,
   customerNextOfKinIdType VARCHAR(100)  NULL,
  customerNextOfKinIdNumber VARCHAR(100) NULL,
   customerNextOfKinPhotoUrl VARCHAR(100) NULL,
   customerNextOfKinHomeAreaDetails VARCHAR(500)  NULL,
    customerNextOfKinDateOfBirth DATE,
        fkCustomerIdCustomerNextOfKin INT  NULL,
    PRIMARY KEY (customerNextOfKinId),
    
    CONSTRAINT fkCustomerIdCustomerNextOfKin FOREIGN KEY (fkCustomerIdCustomerNextOfKin) 
    REFERENCES customer (customerId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerIdCustomerNextOfKinIndex ON user(fkCustomerIdCustomerNextOfKin ASC ) VISIBLE;
    



CREATE TABLE IF NOT EXISTS customerType (
    customerTypeId INT NOT NULL AUTO_INCREMENT,
    customerTypeName VARCHAR(100)  NULL,
    customerTypeCode INT NULL,-- 100=SAVINGS_CUSTOMER,200=BODABODA_CUSTOMER,300=TAXI_CUSTOMER,400=MICROLOAN_CUSTOMER
    fkCustomerIdCustomerType INT  NULL,
    PRIMARY KEY (customerTypeId),
        CONSTRAINT fkCustomerIdCustomerType FOREIGN KEY (fkCustomerIdCustomerType) 
    REFERENCES customer (customerId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 1000
DEFAULT CHARACTER SET = utf8; 
CREATE INDEX fkCustomerIdCustomerTypeIndex ON user(fkCustomerIdCustomerType ASC ) VISIBLE;
    



CREATE TABLE IF NOT EXISTS taxiCustomer (
   taxiCustomerId INT NOT NULL AUTO_INCREMENT,
    taxiCustomerNumberPlate VARCHAR(100)  NULL,
    taxiCustomerColour VARCHAR(100)  NULL,
   taxiCustomerModel VARCHAR(100)  NULL,
    taxiCustomerYearOfManufacture VARCHAR(100)  NULL,
    taxiCustomerEngineNumber VARCHAR(100)  NULL,
    taxiCustomerFrontPhotoUrl VARCHAR(100)  NULL,
    taxiCustomerRearPhotoUrl VARCHAR(100)  NULL,
    taxiCustomerTheTaxiRearPhotoUrl VARCHAR(100)  NULL,
    fkCustomerIdTaxiCustomer INT NULL,
    PRIMARY KEY (taxiCustomerId),
   
    CONSTRAINT fkCustomerIdTaxiCustomer FOREIGN KEY (fkCustomerIdTaxiCustomer) 
    REFERENCES customer (customerId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerIdTaxiCustomerIndex ON user(fkCustomerIdTaxiCustomer ASC ) VISIBLE;





CREATE TABLE IF NOT EXISTS bodabodaCustomer (
   bodabodaCustomerId INT NOT NULL AUTO_INCREMENT,
    bodabodaCustomerNumberPlate VARCHAR(100)  NULL,
    bodabodaCustomerColour VARCHAR(100)  NULL,
    bodabodaCustomerModel VARCHAR(100)  NULL,
    bodabodaCustomerYearOfManufacture VARCHAR(100)  NULL,
    bodabodaCustomerEngineNumber VARCHAR(100)  NULL,
    bodabodaCustomerFrontPhotoUrl VARCHAR(100)  NULL,
    bodabodaCustomerRearPhotoUrl VARCHAR(100)  NULL,
    bodabodaCustomerTheBodabodaRearPhotoUrl VARCHAR(100)  NULL,
    fkCustomerIdBodabodaCustomer INT NULL,
    PRIMARY KEY (bodabodaCustomerId),
   
    CONSTRAINT fkCustomerIdBodabodaCustomer FOREIGN KEY (fkCustomerIdBodabodaCustomer) 
    REFERENCES customer (customerId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerIdBodabodaCustomerIndex ON user(fkCustomerIdBodabodaCustomer ASC ) VISIBLE;

CREATE TABLE IF NOT EXISTS stageCluster (
   stageClusterId INT NOT NULL AUTO_INCREMENT,
  stageClusterName VARCHAR(100)  NULL,
   stageClusterTown VARCHAR(100)  NULL,

      fkApprovalDetailsIdstageCluster  INT  NULL,
    PRIMARY KEY (stageClusterId),
        CONSTRAINT fkApprovalDetailsIdstageCluster FOREIGN KEY (fkApprovalDetailsIdstageCluster) 
    REFERENCES approvalDetails (approvalDetailsId)ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;





CREATE TABLE IF NOT EXISTS stage (
   stageId INT NOT NULL AUTO_INCREMENT,
   stageName VARCHAR(100)  NULL,
   stageChairmanName VARCHAR(100)  NULL,
    stageChairmanPhone1 VARCHAR(100)  NULL,
        fkCustomerIdCustomerNextOfKin INT  NULL,
    PRIMARY KEY (customerNextOfKinId),
    
    CONSTRAINT fkCustomerIdCustomerNextOfKin FOREIGN KEY (fkCustomerIdCustomerNextOfKin) 
    REFERENCES user (userId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerIdCustomerNextOfKinIndex ON user(fkCustomerIdCustomerNextOfKin ASC ) VISIBLE;










CREATE TABLE IF NOT EXISTS savings (

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS loans(

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS loanPayments (

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS interest (

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS interestPayment (

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS commision (

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS commisionDetail (

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS stages (

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS cashLedger (

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS balances (

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS commonBio (

)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;
