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
    roleName VARCHAR(100), -- CENTRAL_MANAGER, AREA_MANAGER, TOWN_MANAGER, STATION_MANAGER, STATION_OFFICER
    PRIMARY KEY (accessRightsId)
)
ENGINE = InnoDB
AUTO_INCREMENT = 200
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS itemRequiringApprovalCreate (
    itemRequiringApprovalId INT NOT NULL,
    itemName VARCHAR(100), -- COMPANY_CREATION,BUSINESSUNIT_CREATION,
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
    bussinessUnitName VARCHAR(100),
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
    areaRegionName VARCHAR(100),
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
    townName VARCHAR(100),
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
   stationName VARCHAR(100),
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
DEFAULT CHARACTER SET = utf8;


CREATE INDEX fkStationIdTheStationIndex ON theStation(fkStationIdTheStation ASC ) VISIBLE;
CREATE INDEX fkTheTownIdTheStationIndex ON theStation(fkTheTownIdTheStation ASC ) VISIBLE;


















CREATE TABLE IF NOT EXISTS clients (
    clientId INT NOT NULL AUTO_INCREMENT,
    clientFirstName VARCHAR(100) NOT NULL,
    clientLastName VARCHAR(100) NOT NULL,
    clientTelNo INT NOT NULL,
    clientNIN VARCHAR(100) NOT NULL,
    clientTaxUID VARCHAR(10),
    clientBodaUID VARCHAR(100),
    clientPassword VARCHAR(100) NOT NULL,
    PRIMARY KEY (clientId)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1000
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS user (
    userId INT NOT NULL AUTO_INCREMENT ,
    ftRoleNameUser VARCHAR(100) NOT NULL,
    userFirstName VARCHAR(20) NOT NULL,
    userLastName VARCHAR(20) NOT NULL,
    userEmail VARCHAR(20) NOT NULL,
    userPassword VARCHAR(20) NOT NULL,
    PRIMARY KEY (userId),
    CONSTRAINT ftRoleNameUser FOREIGN KEY (ftRoleNameUser) 
    REFERENCES accessRights (roleName) ON DELETE CASCADE ON UPDATE NO ACTION
)
ENGINE = InnoDB
AUTO_INCREMENT = 900
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS userDetails (
    
)
ENGINE = InnoDB
AUTO_INCREMENT = 600
DEFAULT CHARACTER SET = utf8;

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