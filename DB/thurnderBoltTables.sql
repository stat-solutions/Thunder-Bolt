DROP TABLE IF EXISTS approvalDetails; -- 1 approvaldetails
DROP TABLE IF EXISTS accessRights;  -- 2 accessrights
DROP TABLE IF EXISTS itemRequiringApprovalCreate;  -- 3 itemrequiringapprovalcreate
DROP TABLE IF EXISTS  itemRequiringApprovalUpdate;  -- 4  itemrequiringapprovalupdate
DROP TABLE IF EXISTS  company ; -- 5 company
DROP TABLE IF EXISTS  businessUnit;  -- 6 businessunit
DROP TABLE IF EXISTS  theBusinessUnit;  -- 7  thebusinessunit
DROP TABLE IF EXISTS  areaRegion ; -- 8 arearegion
DROP TABLE IF EXISTS  theAreaRegion;  -- 9  thearearegion
DROP TABLE IF EXISTS  town ; -- 10  town
DROP TABLE IF EXISTS  theTown ; -- 11  thetown
DROP TABLE IF EXISTS  station;  -- 12  station
DROP TABLE IF EXISTS  theStation;  -- 13  thestation
DROP TABLE IF EXISTS  user;  -- 14  user
DROP TABLE IF EXISTS  userNextOfKin;  -- 15  usernextofkin
DROP TABLE IF EXISTS  loggedInUsers;  -- 16  loggedinusers
DROP TABLE IF EXISTS  customer;  -- 17 customer
DROP TABLE IF EXISTS  customerNextOfKin;  -- 18  customernextofkin
DROP TABLE IF EXISTS  customerType;  -- 19  customertype
DROP TABLE IF EXISTS  taxiPark ; -- 20  taxipark
DROP TABLE IF EXISTS  taxiStage ; -- 21 taxistage
DROP TABLE IF EXISTS  taxiCustomer;  -- 22  taxicustomer
DROP TABLE IF EXISTS  stageCluster ; -- 23 stagecluster
DROP TABLE IF EXISTS  bodabodaStage ; -- 24
DROP TABLE IF EXISTS  bodabodaCustomer;  -- 25 bodabodacustomer
DROP TABLE IF EXISTS  savingsCustomer ; -- 26
DROP TABLE IF EXISTS  microloanCustomer;  -- 27  microloancustomer


/*==============PART ONE:COMPANY SETUP AND AUTHENTICATION=============*/

-- -----------------------------------------------------
-- Table approvalDetails
-- -----------------------------------------------------

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


-- -----------------------------------------------------
-- Table accessRights
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS accessRights (
    accessRightsId INT NOT NULL,
    roleName VARCHAR(100), -- CENTRAL_MANAGER, AREA_MANAGER, TOWN_MANAGER, STATION_MANAGER, STATION_OFFICER,USER_REGISTRATION,
    PRIMARY KEY (accessRightsId)
)
ENGINE = InnoDB
AUTO_INCREMENT = 200
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table itemRequiringApprovalCreate
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS itemRequiringApprovalCreate (
    itemRequiringApprovalId INT NOT NULL,
    itemName VARCHAR(100), -- COMPANY_CREATION,BUSINESSUNIT_CREATION,AREA_CREATION,TOWN_CREATION,STAION_CREATION,
    itemStatus INT,-- 1=FIRST_APPROVAL,2=SECOND_APPROVAL,3=THIRD_APPROVAL,4=FOURTH_APPROVAL,5=FIFTH_APPROVAL
    PRIMARY KEY (itemRequiringApprovalId)
)
ENGINE = InnoDB
AUTO_INCREMENT = 300
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table itemRequiringApprovalUpdate
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS itemRequiringApprovalUpdate (
    itemRequiringApprovalId INT NOT NULL,
    itemName VARCHAR(100), -- COMPANY_UPDATE,BUSINESSUNIT_UPDATE,
    itemStatus INT,-- 1=FIRST_APPROVAL,2=SECOND_APPROVAL,3=THIRD_APPROVAL,4=FOURTH_APPROVAL,5=FIFTH_APPROVAL
    PRIMARY KEY (itemRequiringApprovalId)
)
ENGINE = InnoDB
AUTO_INCREMENT = 400
DEFAULT CHARACTER SET = utf8;





-- -----------------------------------------------------
-- Table company
-- -----------------------------------------------------
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



-- -----------------------------------------------------
-- Table businessUnit
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS businessUnit (
    businnessUnitId INT NOT NULL AUTO_INCREMENT,
    bussinessUnitName VARCHAR(100) DEFAULT 'HEADOFFICEBUSINESSUNIT',
    bussinessUnitStatus INT,-- 1=CREATED,2=APPROVED,3=DEACTIVATED
    fkApprovalDetailsIdBusinessUnit INT NULL,
    PRIMARY KEY (businnessUnitId),
    CONSTRAINT fkApprovalDetailsIdBusinessUnit FOREIGN KEY(fkApprovalDetailsIdBusinessUnit) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkApprovalDetailsIdBusinessUnitIndex ON businessUnit(fkApprovalDetailsIdBusinessUnit ASC ) VISIBLE;





-- -----------------------------------------------------
-- Table theBusinessUnit
-- -----------------------------------------------------
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




-- -----------------------------------------------------
-- Table areaRegion
-- -----------------------------------------------------

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



-- -----------------------------------------------------
-- Table theAreaRegion
-- -----------------------------------------------------

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



-- -----------------------------------------------------
-- Table town
-- -----------------------------------------------------


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


-- -----------------------------------------------------
-- Table theTown
-- -----------------------------------------------------

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



-- -----------------------------------------------------
-- Table station
-- -----------------------------------------------------

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




-- -----------------------------------------------------
-- Table theStation
-- -----------------------------------------------------
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



-- -----------------------------------------------------
-- Table user
-- -----------------------------------------------------

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




-- -----------------------------------------------------
-- Table userNextOfKin
-- -----------------------------------------------------
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


-- -----------------------------------------------------
-- Table loggedInUsers
-- -----------------------------------------------------

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





-- -----------------------------------------------------
-- Table customer
-- -----------------------------------------------------

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
    fkTheStationIdCustomer INT NULL,
    PRIMARY KEY (customerId),

  CONSTRAINT fkApprovalDetailsIdCustomer FOREIGN KEY(fkApprovalDetailsIdCustomer) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION,

      CONSTRAINT fkUserIdCustomer FOREIGN KEY(fkUserIdCustomer) 
    REFERENCES user (userId) ON DELETE CASCADE ON UPDATE NO ACTION,

        CONSTRAINT fkTheStationIdCustomer FOREIGN KEY(fkTheStationIdCustomer) 
    REFERENCES theStation (theStationId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkApprovalDetailsIdCustomerIndex ON customer(fkApprovalDetailsIdCustomer ASC ) VISIBLE;

CREATE INDEX fkUserIdCustomerIndex ON customer(fkUserIdCustomer ASC ) VISIBLE;

CREATE INDEX fkTheStationIdCustomerIndex ON customer(fkTheStationIdCustomer ASC ) VISIBLE;






-- -----------------------------------------------------
-- Table customerNextOfKin
-- -----------------------------------------------------
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
    


-- -----------------------------------------------------
-- Table customerType
-- -----------------------------------------------------

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

CREATE INDEX fkCustomerIdCustomerTypeIndex ON customerType(fkCustomerIdCustomerType ASC ) VISIBLE;
    


-- -----------------------------------------------------
-- Table taxiPark
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS taxiPark (
  taxiParkId INT NOT NULL AUTO_INCREMENT,
  taxiParkName VARCHAR(100)  NULL,
  taxiParkTown VARCHAR(100)  NULL,
      fkApprovalDetailsIdTaxiPark  INT  NULL,
    PRIMARY KEY (taxiParkId),
        CONSTRAINT fkApprovalDetailsIdTaxiPark FOREIGN KEY (fkApprovalDetailsIdTaxiPark) 
    REFERENCES approvalDetails (approvalDetailsId)ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkApprovalDetailsIdTaxiParkIndex ON taxiPark(fkApprovalDetailsIdTaxiPark ASC ) VISIBLE;



-- -----------------------------------------------------
-- Table taxiStage
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS taxiStage (
   taxiStageId INT NOT NULL AUTO_INCREMENT,
   taxiStageName VARCHAR(100)  NULL,
   taxiStageChairmanName VARCHAR(100)  NULL,
   taxiStageChairmanPhone1 VARCHAR(100)  NULL,
          fkTaxiParkIdTaxiStage INT  NULL,
          fkApprovalDetailsIdTaxiStage  INT  NULL,
    PRIMARY KEY (taxiStageId),
    
    CONSTRAINT fkTaxiParkIdTaxiStage FOREIGN KEY (fkTaxiParkIdTaxiStage) 
    REFERENCES taxiPark (taxiParkId) ON DELETE CASCADE ON UPDATE NO ACTION,

        CONSTRAINT fkApprovalDetailsIdTaxiStage FOREIGN KEY (fkApprovalDetailsIdTaxiStage) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkTaxiParkIdTaxiStageIndex ON taxiStage(fkTaxiParkIdTaxiStage ASC ) VISIBLE;
CREATE INDEX fkApprovalDetailsIdTaxiStageIndex ON taxiStage(fkApprovalDetailsIdTaxiStage ASC ) VISIBLE;




-- -----------------------------------------------------
-- Table taxiCustomer
-- -----------------------------------------------------

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
      taxiCustomerNumberPlateStatus INT NULL , --  1=Active,2=Stopped
    fkCustomerTypeIdTaxiCustomer INT NULL,
    fkTaxiStageIdTaxiCustomer INT NULL,
    PRIMARY KEY (taxiCustomerId),
   
    CONSTRAINT fkCustomerTypeIdTaxiCustomer FOREIGN KEY (fkCustomerTypeIdTaxiCustomer) 
    REFERENCES customerType (customerTypeId) ON DELETE CASCADE ON UPDATE NO ACTION,

     CONSTRAINT fkTaxiStageIdTaxiCustomer FOREIGN KEY (fkTaxiStageIdTaxiCustomer) 
    REFERENCES taxiStage (taxiStageId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerTypeIdTaxiCustomerrIndex ON taxiCustomer(fkCustomerTypeIdTaxiCustomer ASC ) VISIBLE;
CREATE INDEX fkTaxiStageIdTaxiCustomerIndex ON taxiCustomer(fkTaxiStageIdTaxiCustomer ASC ) VISIBLE;






-- -----------------------------------------------------
-- Table stageCluster
-- -----------------------------------------------------

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

CREATE INDEX fkApprovalDetailsIdstageClusterIndex ON stageCluster(fkApprovalDetailsIdstageCluster ASC ) VISIBLE;





-- -----------------------------------------------------
-- Table bodabodaStage
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS bodabodaStage (
   bodabodaStageId INT NOT NULL AUTO_INCREMENT,
   bodabodaStageName VARCHAR(100)  NULL,
   bodabodaStageChairmanName VARCHAR(100)  NULL,
    bodabodaStageChairmanPhone1 VARCHAR(100)  NULL,
          fkbodabodaStageClusterIdbodabodaStage INT  NULL,
          fkApprovalDetailsIdbodabodaStage  INT  NULL,
    PRIMARY KEY (bodabodaStageId),
    
    CONSTRAINT fkbodabodaStageClusterIdbodabodaStage FOREIGN KEY (fkbodabodaStageClusterIdbodabodaStage) 
    REFERENCES bodabodaStage (bodabodaStageId) ON DELETE CASCADE ON UPDATE NO ACTION,

        CONSTRAINT fkApprovalDetailsIdbodabodaStage FOREIGN KEY (fkApprovalDetailsIdbodabodaStage) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkbodabodaStageClusterIdbodabodaStageIndex ON bodabodaStage(fkbodabodaStageClusterIdbodabodaStage ASC ) VISIBLE;
CREATE INDEX fkApprovalDetailsIdbodabodaStageIndex ON bodabodaStage(fkApprovalDetailsIdbodabodaStage ASC ) VISIBLE;






-- -----------------------------------------------------
-- Table bodabodaCustomer
-- -----------------------------------------------------

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
    bodabodaNumberPlateStatus INT NULL , --  1=Active,2=Stopped
    fkCustomerIdBodabodaCustomer INT NULL,
    fkbodabodaStageIdBodabodaCustomer INT NULL,
    PRIMARY KEY (bodabodaCustomerId),
   
    CONSTRAINT fkCustomerIdBodabodaCustomer FOREIGN KEY (fkCustomerIdBodabodaCustomer) 
    REFERENCES customer (customerId) ON DELETE CASCADE ON UPDATE NO ACTION,

      CONSTRAINT fkbodabodaStageIdBodabodaCustomer FOREIGN KEY (fkbodabodaStageIdBodabodaCustomer) 
    REFERENCES bodabodaStage (bodabodaStageId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerIdBodabodaCustomerIndex ON bodabodaCustomer(fkCustomerIdBodabodaCustomer ASC ) VISIBLE;

CREATE INDEX fkbodabodaStageIdBodabodaCustomerIndex ON bodabodaCustomer(fkbodabodaStageIdBodabodaCustomer ASC ) VISIBLE;








-- -----------------------------------------------------
-- Table savingsCustomer
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS savingsCustomer (
   savingsCustomerId INT NOT NULL AUTO_INCREMENT,
   savingsCustomerMonthlyIncome VARCHAR(100)  NULL,
   savingsCustomerWithdrawFreequency VARCHAR(100)  NULL,
    fkCustomerTypeIdSavingsCustomer INT NULL,
    PRIMARY KEY (savingsCustomerId),
    CONSTRAINT fkCustomerTypeIdSavingsCustomer FOREIGN KEY (fkCustomerTypeIdSavingsCustomer) 
    REFERENCES customerType (customerTypeId) ON DELETE CASCADE ON UPDATE NO ACTION


)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerTypeIdSavingsCustomerIndex ON savingsCustomer(fkCustomerTypeIdSavingsCustomer ASC ) VISIBLE;







-- -----------------------------------------------------
-- Table microloanCustomer
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS microloanCustomer (
    microloanCustomerId INT NOT NULL AUTO_INCREMENT,
    microloanCustomerGaurantor1 VARCHAR(100)  NULL,
     microloanCustomerGaurantor2 VARCHAR(100)  NULL,
   microloanCustomerGaurantor3 VARCHAR(100)  NULL,
     microloanCustomerSecurity1 VARCHAR(100)  NULL,
      microloanCustomerSecurity2 VARCHAR(100)  NULL,
       microloanCustomerSecurityLocation1 VARCHAR(100)  NULL,
      microloanCustomerSecurityLocation2 VARCHAR(100)  NULL,
    microloanCustomerSecurity1PhotoUrl VARCHAR(100)  NULL,
    microloanCustomerSecurity2PhotoUrl VARCHAR(100)  NULL,
    fkCustomerTypeIdMicroloanCustomerId INT NULL,
    PRIMARY KEY (microloanCustomerId),
   
    CONSTRAINT fkCustomerTypeIdMicroloanCustomerId FOREIGN KEY (fkCustomerTypeIdMicroloanCustomerId) 
    REFERENCES customerType (customerTypeId) ON DELETE CASCADE ON UPDATE NO ACTION


)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerTypeIdMicroloanCustomerIdIndex ON microloanCustomer(fkCustomerTypeIdMicroloanCustomerId ASC ) VISIBLE;





-- -----------------------------------------------------
-- Table loan
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS loan (
    loanId INT NOT NULL AUTO_INCREMENT,
    loanDays INT NULL,
   loanCycle INT NULL,
   loanStatus INT NULL, --  1=Running,2=Completed,3=Stopped 
   loanDateTaken  TIMESTAMP,
   loanAmountTaken DOUBLE ,
   loanAmountPaid DOUBLE,
   loanAmountWrittenOff DOUBLE,
   loanAmountReversed DOUBLE,
   loanAmountRemaining DOUBLE,
   fkCustomerIdLoan INT NULL,
   fkUserIdLoan  INT NULL,
   fkApprovalDetailsIdLoan  INT  NULL,
    PRIMARY KEY (loanId),
   
    CONSTRAINT fkCustomerIdLoan FOREIGN KEY (fkCustomerIdLoan) 
    REFERENCES customer (customerId) ON DELETE CASCADE ON UPDATE NO ACTION,

      CONSTRAINT fkUserIdLoan FOREIGN KEY (fkUserIdLoan) 
    REFERENCES user (userId) ON DELETE CASCADE ON UPDATE NO ACTION,

         CONSTRAINT fkApprovalDetailsIdLoan FOREIGN KEY (fkApprovalDetailsIdLoan) 
    REFERENCES approvalDetails (approvalDetailsId) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerIdLoanIndex ON loan(fkCustomerIdLoan ASC ) VISIBLE;

CREATE INDEX fkUserIdLoanIndex ON loan(fkUserIdLoan ASC ) VISIBLE;

CREATE INDEX fkApprovalDetailsIdLoanIndex ON loan(fkApprovalDetailsIdLoan ASC ) VISIBLE;








-- -----------------------------------------------------
-- Table bodabodaLoan
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS bodabodaLoan (
    bodabodaLoanId INT NOT NULL AUTO_INCREMENT,
    bodabodaLoanInterestExceptionStatus INT NULL, -- 1=NotExcepted,2=Excepted,3=Stopped 
   bodabodaLoanChairmanStatus INT NULL,--  1=HeIsNot,2=HeIs,3=HeWasStopped 
    bodabodaLoanStatus INT NULL, --  1=Running,2=Completed,3=Stopped 
    bodabodaLoanInterestAccrualStatus   INT NULL, -- 1=OnGoing,2=Stopped
    bodabodaLoanAccrualStartTime TIMESTAMP,
      bodabodaLoanAccrualExpirelyTime TIMESTAMP,
    bodabodaLoanNoOfAccruals  INT NULL,
    fkCustomerIdBodabodaLoan  INT NULL,
    PRIMARY KEY (bodabodaLoanId),
   
    CONSTRAINT fkCustomerIdBodabodaLoan FOREIGN KEY (fkCustomerIdBodabodaLoan) 
    REFERENCES loan (loanId) ON DELETE CASCADE ON UPDATE NO ACTION,


)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerIdBodabodaLoanIndex ON bodabodaCustomer(fkCustomerIdBodabodaLoan ASC ) VISIBLE;





-- -----------------------------------------------------
-- Table bodabodaLoan
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS taxiLoan (
    taxiLoanId INT NOT NULL AUTO_INCREMENT,
    taxiInterestExceptionStatus INT NULL, -- 1=NotExcepted,2=Excepted,3=Stopped 
   taxiChairmanStatus INT NULL,--  1=HeIsNot,2=HeIs,3=HeWasStopped 
    taxiStatus INT NULL, --  1=Running,2=Completed,3=Stopped 
    taxiInterestAccrualStatus   INT NULL, -- 1=OnGoing,2=Stopped
    taxiAccrualStartTime TIMESTAMP,
    taxiAccrualExpirelyTime TIMESTAMP,
    taxiNoOfAccruals  INT NULL,
    fkCustomerIdTaxiLoan  INT NULL,
    PRIMARY KEY (taxiLoanId),
   
    CONSTRAINT fkCustomerIdTaxiLoan FOREIGN KEY (fkCustomerIdTaxiLoan) 
    REFERENCES loan (loanId) ON DELETE CASCADE ON UPDATE NO ACTION,


)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkCustomerIdTaxiLoanIndex ON bodabodaCustomer(fkCustomerIdTaxiLoan ASC ) VISIBLE;



-- -----------------------------------------------------
-- Table accountTypes 
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS accountTypes (
  accountTypesId INT NOT NULL AUTO_INCREMENT,
  accountTypeName VARCHAR(100) NULL,
   accountTypeNumber INT(11) NULL,
  PRIMARY KEY (accountTypesId))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET=utf8;








-- -----------------------------------------------------
-- Table loanTxn
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS loanTxn (
    loanTxnId INT NOT NULL AUTO_INCREMENT,
    loanTxnStatus INT NULL, -- 1=OnGoing,2=Completed
    loanTxnAmountDisbursed  DOUBLE NULL,
    loanTxnAmountPaid DOUBLE NULL,
    loanTxnAmountWrittenOff DOUBLE NULL,
    loanTxnAmountReversed DOUBLE NULL,
    loanTxnAmountRemaining DOUBLE NULL,
    txnDate TIMESTAMP,
    fkLoanIdLoanTxn  INT NULL,
    PRIMARY KEY (loanTxnId),
   
    CONSTRAINT fkLoanIdLoanTxn FOREIGN KEY (fkLoanIdLoanTxn) 
    REFERENCES loan (loanId) ON DELETE CASCADE ON UPDATE NO ACTION,


)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkLoanIdLoanTxnIndex ON loanPayment(fkLoanIdLoanTxn ASC ) VISIBLE;





-- -----------------------------------------------------
-- Table interest
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS interest (
    interestId INT NOT NULL AUTO_INCREMENT,
    interestAccrualStatus INT NULL, -- 1=OnGoing,2=Completed
   interestAmount DOUBLE NULL,
   interestPaid DOUBLE NULL,
   interestWaived DOUBLE NULL,
    interestReversed DOUBLE NULL,
    interestRemaining DOUBLE NULL,
    fkLoanIdInterest  INT NULL,
    PRIMARY KEY (interestId),
   
    CONSTRAINT fkLoanIdInterest FOREIGN KEY (fkLoanIdInterest) 
    REFERENCES loan (loanId) ON DELETE CASCADE ON UPDATE NO ACTION,


)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkLoanIdInterestIndex ON interest(fkLoanIdInterest ASC ) VISIBLE;



-- -----------------------------------------------------
-- Table interestTxn
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS interestTxn (
    interestTxnId INT NOT NULL AUTO_INCREMENT,
   interestAmount DOUBLE NULL,
   interestAdded DOUBLE NULL,
    interestPaid DOUBLE NULL,
     interestRemaining DOUBLE NULL,
    fkInterestIdInterestTxn  INT NULL,
    PRIMARY KEY (interestId),
   
    CONSTRAINT fkInterestIdInterestTxn FOREIGN KEY (fkInterestIdInterestTxn) 
    REFERENCES interest (interestId) ON DELETE CASCADE ON UPDATE NO ACTION,


)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fkInterestIdInterestTxnIndex ON interest(fkInterestIdInterestTxn ASC ) VISIBLE;





-- -----------------------------------------------------
-- Table commission
-- -----------------------------------------------------
DROP TABLE IF EXISTS commission;

CREATE TABLE IF NOT EXISTS commission (
  commissionId INT(11) NOT NULL AUTO_INCREMENT,
  commissionAmount DOUBLE NULL,
   fkInterestIdCommision INT,
  PRIMARY KEY (commissionId),
  CONSTRAINT fkInterestIdCommision
    FOREIGN KEY (fkInterestIdCommision)
    REFERENCES interest (interestId)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
    )
ENGINE = InnoDB
AUTO_INCREMENT = 1300
DEFAULT CHARACTER SET = utf8;


CREATE INDEX fkInterestIdCommisionIndx ON commission (fkInterestIdCommision ASC) VISIBLE;










-- -----------------------------------------------------
-- Table commissionDetails
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS commissionDetails (
  commissionDetailsId INT(11) NOT NULL AUTO_INCREMENT,
  commissionAmountAdded DOUBLE NULL,
  commissionDateComputed TIMESTAMP,
   fkCommissionIdCommissionDetails INT,
  PRIMARY KEY (commissionDetailsId),

  CONSTRAINT fkCommissionIdCommissionDetails
    FOREIGN KEY (fkCommissionIdCommissionDetails)
    REFERENCES commission (commissionId)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
    
    )

ENGINE = InnoDB
AUTO_INCREMENT = 6500
DEFAULT CHARACTER SET = utf8;


CREATE INDEX fkCommissionIdCommissionDetailsIndx ON commissionDetails (fkCommissionIdCommissionDetails ASC) VISIBLE;



-- ---------------------------------------------------
-- Table trn_general_ledger
-- ---------------------------------------------------
DROP TABLE IF EXISTS trnGeneralLedger;

CREATE TABLE IF NOT EXISTS trnGeneralLedger (
  trnGeneralLedgerId INT(11) NOT NULL AUTO_INCREMENT,
  trnDate TIMESTAMP NULL DEFAULT NULL,
  trn_type VARCHAR(50) NULL DEFAULT NULL,
  trn_debit DOUBLE NULL DEFAULT NULL,
  trn_credit DOUBLE NULL DEFAULT NULL,
   fk_petrol_station_id_trn_general_ledger INT(11) NULL DEFAULT NULL,
  fk_user_id_posted_by_trn_general_ledger_id INT(11) NULL DEFAULT NULL,
  fk_user_id_belongs_to_trn_general_ledger_id INT(11) NULL DEFAULT NULL,
   fk_shift_id_trn_general_ledger INT(11) NULL DEFAULT NULL,

  PRIMARY KEY (trnGeneralLedgerId),

  CONSTRAINT fk_petrol_station_id_trn_general_ledger
  FOREIGN KEY (fk_petrol_station_id_trn_general_ledger)
  REFERENCES petrol_station(petrol_station_id)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,

  CONSTRAINT fk_user_id_posted_by_trn_general_ledger_id
  FOREIGN KEY (fk_user_id_posted_by_trn_general_ledger_id)
  REFERENCES users(users_id)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,

   CONSTRAINT fk_user_id_belongs_to_trn_general_ledger_id
  FOREIGN KEY (fk_user_id_belongs_to_trn_general_ledger_id)
  REFERENCES users(users_id)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,
  
    CONSTRAINT fk_shift_id_trn_general_ledger
  FOREIGN KEY (fk_shift_id_trn_general_ledger)
  REFERENCES shift(shift_id)
  ON DELETE CASCADE
  ON UPDATE NO ACTION )

ENGINE = InnoDB
AUTO_INCREMENT = 4000
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fk_user_id_posted_by_trn_general_ledger_id_indx ON trn_general_ledger(fk_user_id_posted_by_trn_general_ledger_id ASC);

CREATE INDEX fk_user_id_belongs_to_trn_general_ledger_id_indx ON trn_general_ledger(fk_user_id_belongs_to_trn_general_ledger_id ASC);


CREATE INDEX fk_shift_id_trn_general_ledger_indx ON trn_general_ledger(fk_shift_id_trn_general_ledger ASC);

CREATE INDEX fk_petrol_station_id_trn_general_ledger_indx ON trn_general_ledger(fk_petrol_station_id_trn_general_ledger ASC);




-- ---------------------------------------------------
-- Table trn_customer_details
-- ---------------------------------------------------
DROP TABLE IF EXISTS trn_customer_details;

CREATE TABLE IF NOT EXISTS trn_customer_details (
  trn_customer_details_id INT(11) NOT NULL AUTO_INCREMENT,
  trn_number_plate VARCHAR(50) NULL DEFAULT NULL,
  trn_customer_name VARCHAR(50) NULL DEFAULT NULL,
   fk_trn_general_ledger_id_trn_customer_details INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (trn_customer_details_id),

  CONSTRAINT fk_trn_general_ledger_id_trn_customer_details
  FOREIGN KEY (fk_trn_general_ledger_id_trn_customer_details)
  REFERENCES trn_general_ledger(trn_general_ledger_id)
  ON DELETE CASCADE
  ON UPDATE NO ACTION )

ENGINE = InnoDB
AUTO_INCREMENT = 5200
DEFAULT CHARACTER SET = utf8;

CREATE INDEX fk_trn_general_ledger_id_trn_customer_details_indx ON trn_customer_details(fk_trn_general_ledger_id_trn_customer_details ASC);


-- -----------------------------------------------------
-- Table balance_per_day
-- -----------------------------------------------------
DROP TABLE IF EXISTS balance_per_day;
CREATE TABLE IF NOT EXISTS balance_per_day (
  balance_per_day_id INT(11) NOT NULL AUTO_INCREMENT,
  the_balance DOUBLE NULL,
  fk_petrol_station_id_balance_per_day INT NULL,
  trn_date TIMESTAMP,
  PRIMARY KEY (balance_per_day_id),
  
  
  CONSTRAINT fk_petrol_station_id_balance_per_day
  FOREIGN KEY (fk_petrol_station_id_balance_per_day)
  REFERENCES petrol_station(petrol_station_id)
  ON DELETE CASCADE
  ON UPDATE NO ACTION
    
    )
ENGINE = InnoDB
AUTO_INCREMENT = 4750
DEFAULT CHARACTER SET = utf8;

-- CREATE INDEX the_balance_indx ON balance_per_day (the_balance ASC) VISIBLE;

-- CREATE INDEX fk_petrol_station_id_balance_per_day_indx ON balance_per_day (fk_petrol_station_id_balance_per_day ASC) VISIBLE;



