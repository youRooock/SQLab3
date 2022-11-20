import { test, expect } from '@playwright/test';
import { Applicant } from './model/Applicant';
import path from 'path'

const baseUrl = 'https://4300-62-122-202-127.eu.ngrok.io/';

test.describe("Happy path", () => {
  test('Should successfully submit application #1', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {
      ...applicantStub,
      fullName: "T",
      fatherName: "T",
      motherName: "T",
      mobileNumber: "1",
      gpa: "0",
    });
  
    await expect(page).toHaveURL(baseUrl + "students/applicants/");
  });

  test('Should successfully submit application #2', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {
      ...applicantStub,
      fullName: "T".repeat(100),
      fatherName: "T".repeat(100),
      motherName: "T".repeat(100),
      mobileNumber: "12345678912",
      gpa: "4",
    });
  
    await expect(page).toHaveURL(baseUrl + "students/applicants/");
  });
});

test.describe('Fullname', () => {
  test('Fullname cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, fullName: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
  
  test('Fullname cant consist of 101 characters and gets truncated', async ({ page }) => {
    const rndName = generateRndStr(100);
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, fullName: rndName + "T"});
  
    await expect(page).toHaveURL(baseUrl + "students/applicants/");
    await expect(await page.getByText(rndName)).toBeTruthy();
  });
});

test.describe('Father name', () => {
  test('Father name cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, fatherName: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
  
  test('Father name cant consist of 101 characters and gets truncated', async ({ page }) => {
    const rndName = generateRndStr(100);
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, fatherName: rndName + "T"});
  
    await expect(page).toHaveURL(baseUrl + "students/applicants/");
  });
});

test.describe('Mother name', () => {
  test('Mother name cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, motherName: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
  
  test('Mother name cant consist of 101 characters and gets truncated', async ({ page }) => {
    const rndName = generateRndStr(100);
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, motherName: rndName + "T"});
  
    await expect(page).toHaveURL(baseUrl + "students/applicants/");
  });
});

test.describe('Birth day', () => {
  test('Birth day cant be greater than 16 years ago', async ({ page }) => {
    var date = new Date();

    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, birthDay: `${date.getUTCFullYear()-15}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
});

test.describe('City', () => {
  test('City cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, city: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
});

test.describe('Current address', () => {
  test('Current address cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, currentAddress: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
});

test.describe('Permanent address', () => {
  test('Permanent address cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, permanentAddress: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
});

test.describe('Mobile number', () => {
  test('Mobile number cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, mobileNumber: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('Mobile number cant have more than 11 digits and gets truncated', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, mobileNumber: "123456789123"});
  
    await expect(page).toHaveURL(baseUrl + "students/applicants/");
  });
});

test.describe('Guardian mobile number', () => {
  test('Guardian mobile number cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, guardianMobileNumber: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('Guardian mobile number cant have more than 11 digits and gets truncated', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, guardianMobileNumber: "123456789123"});
  
    await expect(page).toHaveURL(baseUrl + "students/applicants/");
  });
});

test.describe('Email address', () => {
  test('Email address cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, email: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('Email address should have @', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, email: "test.com"});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('Email address cant be only @', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, email: "@"});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('Email address cant be without domain', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, email: "test@"});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('Email address cant be without name', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, email: "@test"});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('Email address cant have multiple @', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, email: "test@test@test.com"});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
});

test.describe('Department', () => {
  test('Department cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, department: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
});

test.describe('GPA', () => {
  test('GPA cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, gpa: ""});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('GPA cant be negative', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, gpa: "-1.33"});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('GPA cant be greater than 4', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, gpa: "4.01"});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('GPA cant have more than 2 digits after floating point', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, gpa: "4.011"});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
});

test.describe('Photo', () => {
  test('Photo cant be blank', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, avatar: "./picture/blank.jpeg"});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('Photo cant have .txt extension', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, avatar: path.join(__dirname, "./picture/picture.txt")});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('Photo cant be corrupted', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, avatar: path.join(__dirname, "./picture/corrupted.png")});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
});

test.describe('Marksheet photo', () => {
  test('Photo cant have .txt extension', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, marksheetAvatar: path.join(__dirname, "./picture/picture.txt")});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });

  test('Photo cant be corrupted', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, {...applicantStub, marksheetAvatar: path.join(__dirname, "./picture/corrupted.png")});
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
});

test.describe('Policy agreement', () => {
  test('Policy agreement must be checked', async ({ page }) => {
    await openApplicantsPage(page);
    await fillFields(page, applicantStub, false);
  
    await expect(page).toHaveURL(baseUrl + "students/add/");
  });
});


const openApplicantsPage = async (page) => {
  await page.goto(baseUrl + 'accounts/login');
  await login(page);
  await page.goto(baseUrl + 'students/add/');
}

const login = async (page) => {
  await page.locator('[name="login"]').fill('admin@admin.com');
  await page.locator('[name="password"]').fill('test');
  await page.locator('[type="submit"]').click();
};

const fillFields = async (page, applicant: Applicant, agree: boolean = true) => {
  await page.locator('[name="name"]').fill(applicant.fullName);
  await page.locator('[name="fathers_name"]').fill(applicant.fatherName);
  await page.locator('[name="mothers_name"]').fill(applicant.motherName);
  await page.locator('[name="date_of_birth"]').fill(applicant.birthDay);
  await page.locator('[name="city"]').selectOption(applicant.city);
  await page.locator('[name="current_address"]').fill(applicant.currentAddress);
  await page.locator('[name="permanent_address"]').fill(applicant.permanentAddress);
  await page.locator('[name="mobile_number"]').fill(applicant.mobileNumber);
  await page.locator('[name="guardian_mobile_number"]').fill(applicant.guardianMobileNumber);
  await page.locator('[name="email"]').fill(applicant.email);
  await page.locator('[name="email"]').fill(applicant.email);
  await page.locator('[name="tribal_status"]').selectOption(applicant.tribalStatus ? "1" : "0");
  await page.locator('[name="children_of_freedom_fighter"]').selectOption(applicant.childOfFreedonFighter ? "1" : "0");
  await page.locator('[name="department_choice"]').selectOption(applicant.department);
  await page.locator('[name="exam_name"]').selectOption(applicant.examName);
  await page.locator('[name="passing_year"]').fill(applicant.passingYear);
  await page.locator('[name="group"]').fill(applicant.group);
  await page.locator('[name="board"]').fill(applicant.board);
  await page.locator('[name="ssc_roll"]').fill(applicant.sscRoll);
  await page.locator('[name="ssc_registration"]').fill(applicant.sscRoll);
  await page.locator('[name="gpa"]').fill(applicant.gpa);
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('[name="photo"]').click(),
  ]);
  await fileChooser.setFiles(applicant.avatar);

  if (applicant.marksheetAvatar) {
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('[name="marksheet_image"]').click(),
    ]);
    await fileChooser.setFiles(applicant.marksheetAvatar);
  }

  if (agree) {
    await page.locator('[name="admission_policy_agreement"]').click();
  }
  
  await page.locator('[value="Add New Application"]').click();
};

const applicantStub: Applicant = {
  fullName: "John Doe",
  fatherName: "John",
  motherName: "Johnita",
  birthDay: "2000-05-25",
  city: "01",
  currentAddress: "Bonas str, 54/3",
  permanentAddress: "Bonas str, 54/3",
  mobileNumber: "76352311",
  guardianMobileNumber: "12341122",
  email: "t@t.ee",
  tribalStatus: true,
  childOfFreedonFighter: false,
  department: "1",
  examName: "VOCATIONAL",
  passingYear: "2016",
  group: "E-28b",
  board: "G/133",
  sscRoll: "9928u",
  sscRegistration: "1899qb",
  gpa: "12.55",
  avatar: path.join(__dirname, "./picture/banglaman.jpeg"),
}

const generateRndStr = (length: number) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}