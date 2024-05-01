import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, enum as enum_, array } from 'zod';
import {
  EmployeeAccessStatus,
  EmployeeStatus,
  EmploymentContractType,
  GenderEnum,
  JobTitleEnum,
  Role,
} from '../../models/Employee';
import type { TFunction } from 'i18next';
import { getInvalidMessage } from '~/utils/functions/getInvalidMessage';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';
import { isEmail, isPhone } from '~/utils/regexes';

export const getFormMutationResolver = ({
  needPassword,
  t,
}: {
  t: TFunction<['common', 'employee']>;
  needPassword: boolean;
}) => {
  const fullName = {
    required: getRequiredMessage(t, 'employee:fullName'),
    length: getRangeLengthMessage(t, 'employee:fullName', 1, 100),
    invalid: t('employee:full_name_invalid'),
  };
  const phone = {
    required: getRequiredMessage(t, 'employee:phone'),
    invalid: getInvalidMessage(t, 'employee:phone'),
  };
  const dateOfBirth = {
    required: getRequiredMessage(t, 'employee:date_of_birth'),
  };
  const gender = {
    required: getRequiredMessageSelectField(t, 'employee:gender'),
  };
  const workEmail = {
    required: getRequiredMessage(t, 'employee:work_email'),
    invalid: getInvalidMessage(t, 'employee:work_email'),
  };
  const personalEmail = {
    required: getRequiredMessage(t, 'employee:personal_email'),
    invalid: getInvalidMessage(t, 'employee:personal_email'),
  };
  const currentAddress = {
    length: getRangeLengthMessage(t, 'employee:current_address', 3, 96),
    invalid: t('employee:current_address_invalid'),
  };
  const residenceAddress = {
    length: getRangeLengthMessage(t, 'employee:residence_address', 3, 96),
    invalid: t('employee:residence_address_invalid'),
  };
  const citizenIdCard = {
    length: getRangeLengthMessage(t, 'employee:citizen_id_card', 8, 16),
    invalid: t('employee:citizen_id_card_invalid'),
  };
  const emergencyContactName = {
    length: getRangeLengthMessage(t, 'employee:emergency_contact_name', 1, 100),
    invalid: t('employee:emergency_contact_name_invalid'),
  };
  const emergencyContactPhone = {
    invalid: getInvalidMessage(t, 'employee:emergency_contact_phone'),
  };
  const emergencyContactRelationship = {
    length: getRangeLengthMessage(t, 'employee:emergency_contact_relationship', 2, 16),
    invalid: t('employee:emergency_contact_relationship_invalid'),
  };
  const notes = {
    length: getRangeLengthMessage(t, 'employee:note', 0, 256),
  };
  const personnelRecordDepartment = {
    required: getRequiredMessageSelectField(t, 'employee:department'),
  };
  const jobTitle = {
    required: getRequiredMessageSelectField(t, 'employee:job_title'),
  };
  const workStatus = {
    required: getRequiredMessageSelectField(t, 'employee:work_status'),
  };
  const roles = {
    required: getRequiredMessageSelectField(t, 'employee:role'),
  };
  const username = {
    required: getRequiredMessage(t, 'employee:username'),
    length: getRangeLengthMessage(t, 'employee:username', 5, 12),
    invalid: t('employee:username_invalid'),
  };
  const password = {
    required: getRequiredMessage(t, 'employee:password'),
    length: getRangeLengthMessage(t, 'employee:password', 8, 12),
    invalid: t('employee:password_invalid'),
  };
  const accessStatus = {
    required: getRequiredMessageSelectField(t, 'employee:employee_access_status'),
  };
  const roleSystemSchema = object({
    roles: array(enum_([Role.Admin, Role.Consultant, Role.Lecturer, Role.Sale, Role.Student]), {
      required_error: roles.required,
    }).min(1, roles.required),
    username: string({ required_error: username.required })
      .min(5, username.length)
      .max(12, username.length)
      .regex(/^[\p{L}0-9]*$/u, username.invalid),
    accessStatus: enum_([EmployeeAccessStatus.BLOCKED, EmployeeAccessStatus.GRANTED], {
      required_error: accessStatus.required,
    }),
  });

  return zodResolver(
    object({
      personalInformation: object({
        fullName: string({ required_error: fullName.required })
          .min(1, fullName.length)
          .max(100, fullName.length)
          .regex(/^[\p{L}0-9\- ]*$/u, fullName.invalid)
          .trim(),
        phone: string({ required_error: phone.required }).regex(isPhone, phone.invalid).trim(),
        dateOfBirth: string({ required_error: dateOfBirth.required }),
        gender: enum_([GenderEnum.FEMALE, GenderEnum.MALE], {
          required_error: gender.required,
        }),
        workEmail: string({ required_error: workEmail.required }).regex(isEmail, workEmail.invalid).trim(),
        personalEmail: string({ required_error: personalEmail.required }).regex(isEmail, personalEmail.invalid).trim(),
        currentAddress: string()
          .min(3, currentAddress.length)
          .max(96, currentAddress.length)
          .regex(/^[\p{L}0-9\s/]*$/u, currentAddress.invalid)
          .trim()
          .optional(),
        residenceAddress: string()
          .min(3, residenceAddress.length)
          .max(96, residenceAddress.length)
          .regex(/^[\p{L}0-9\s/]*$/u, residenceAddress.invalid)
          .trim()
          .optional(),
        region: string().trim().optional(),
        citizenIdCard: string()
          .min(8, citizenIdCard.length)
          .max(16, citizenIdCard.length)
          .regex(/^[\p{L}0-9\s-]*$/u, citizenIdCard.invalid)
          .trim()
          .optional(),
        emergencyContactName: string()
          .min(1, emergencyContactName.length)
          .max(100, emergencyContactName.length)
          .regex(/^[\p{L}0-9\s'-]*$/u, emergencyContactName.invalid)
          .trim()
          .optional(),
        emergencyContactPhone: string()
          .trim()
          .refine(
            value => {
              if (value !== undefined && value !== null && value.trim() !== '') {
                return new RegExp(isPhone).test(value);
              }
              return true;
            },
            { message: emergencyContactPhone.invalid },
          )
          .optional(),
        emergencyContactRelationship: string()
          .min(1, emergencyContactRelationship.length)
          .max(100, emergencyContactRelationship.length)
          .regex(/^[a-zA-Z\s]*$/u, emergencyContactRelationship.invalid)
          .trim()
          .optional(),
        notes: string().min(0, notes.length).max(256, notes.length).trim().optional(),
      }),
      personnelRecord: object({
        code: string().optional(),
        department: string({ required_error: personnelRecordDepartment.required }),
        jobTitle: enum_([JobTitleEnum.CONSULTANT, JobTitleEnum.LECTURER, JobTitleEnum.SALES_PERSONNEL], {
          required_error: jobTitle.required,
        }),
        directionManager: string().optional(),
        workStatus: enum_(
          [
            EmployeeStatus.MATERNITY_LEAVE,
            EmployeeStatus.TERMINATED,
            EmployeeStatus.UNPAID_LEAVE,
            EmployeeStatus.WORKING,
          ],
          { required_error: workStatus.required },
        ),
        contractType: enum_([EmploymentContractType.FULL_TIME, EmploymentContractType.PART_TIME]).optional(),
        contractStartEffectDate: string().optional(),
        contractEndEffectDate: string().optional(),
      }),
      roleSystem: needPassword
        ? roleSystemSchema.extend({
            password: string({ required_error: password.required })
              .min(8, password.length)
              .max(12, password.length)
              .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&\s'-])[A-Za-z\d@$!%*?&\s'-]+$/, password.invalid),
          })
        : roleSystemSchema,
    }),
  );
};
