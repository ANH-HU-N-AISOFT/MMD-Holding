import { zodResolver } from '@hookform/resolvers/zod';
import { array, enum as enum_, literal, object, string } from 'zod';

import { ContractType } from '../../models/ContractType';
import { JobTitleEnum } from '../../models/JobTitleEnum';
import { WorkStatus } from '../../models/WorkStatus';
import type { TFunction } from 'i18next';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';
import { getInvalidMessage } from '~/utils/functions/getInvalidMessage';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';
import { isEmail, isPhone } from '~/utils/regexes';
import { isStrongPassword } from '~/utils/regexes/src/isStrongPassword';

export const getFormMutationSchema = ({
  needPassword,
  t,
}: {
  t: TFunction<['common', 'employee']>;
  needPassword: boolean;
}) => {
  const fullName = {
    required: getRequiredMessage(t, 'employee:full_name'),
    length: getRangeLengthMessage(t, 'employee:full_name', 1, 100),
    invalid: t('employee:full_name_invalid'),
  };
  const phone = {
    required: getRequiredMessage(t, 'employee:phone'),
    invalid: getInvalidMessage(t, 'employee:phone'),
  };
  const dateOfBirth = {
    required: t('employee:date_of_birth_required'),
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
    required: getRequiredMessage(t, 'employee:emergency_contact_name'),
    length: getRangeLengthMessage(t, 'employee:emergency_contact_name', 1, 100),
    invalid: t('employee:emergency_contact_name_invalid'),
  };
  const emergencyContactPhone = {
    required: getRequiredMessage(t, 'employee:emergency_contact_phone'),
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
    required: t('employee:department_invalid'),
  };
  const jobTitles = {
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

  return object({
    personalInformation: object({
      fullName: string({ required_error: fullName.required })
        .trim()
        .min(1, fullName.length)
        .max(100, fullName.length)
        .regex(/^[\p{L}\-'\s]*$/u, fullName.invalid),
      phone: string({ required_error: phone.required }).trim().min(1, phone.required).regex(isPhone, phone.invalid),
      dateOfBirth: string({ required_error: dateOfBirth.required }),
      gender: enum_([GenderEnum.FEMALE, GenderEnum.MALE], {
        required_error: gender.required,
      }),
      workEmail: string({ required_error: workEmail.required }).trim().regex(isEmail, workEmail.invalid),
      personalEmail: string({ required_error: personalEmail.required }).trim().regex(isEmail, personalEmail.invalid),
      currentAddress: string()
        .trim()
        .min(3, currentAddress.length)
        .max(96, currentAddress.length)
        .regex(/^[\p{L}0-9\s/]*$/u, currentAddress.invalid)
        .optional()
        .or(literal(''))
        .nullable(),
      residenceAddress: string()
        .trim()
        .min(3, residenceAddress.length)
        .max(96, residenceAddress.length)
        .regex(/^[\p{L}0-9\s/]*$/u, residenceAddress.invalid)
        .optional()
        .or(literal(''))
        .nullable(),
      region: string().trim().optional().or(literal('')).nullable(),
      citizenIdCard: string()
        .trim()
        .min(8, citizenIdCard.length)
        .max(16, citizenIdCard.length)
        .regex(/^[\p{L}0-9\-\s]*$/u, citizenIdCard.invalid)
        .optional()
        .or(literal(''))
        .nullable(),
      emergencyContactName: string({ required_error: emergencyContactName.required })
        .trim()
        .min(1, emergencyContactName.length)
        .max(100, emergencyContactName.length)
        .regex(/^[\p{L}\-'\s]*$/u, emergencyContactName.invalid),
      emergencyContactPhone: string({ required_error: emergencyContactPhone.required })
        .trim()
        .min(1, emergencyContactPhone.required)
        .refine(
          value => {
            if (value !== undefined && value !== null && value.trim() !== '') {
              return new RegExp(isPhone).test(value);
            }
            return true;
          },
          { message: emergencyContactPhone.invalid },
        ),
      emergencyContactRelationship: string()
        .trim()
        .min(2, emergencyContactRelationship.length)
        .max(16, emergencyContactRelationship.length)
        .regex(/^[\p{L}\s]*$/u, emergencyContactRelationship.invalid)
        .optional()
        .or(literal(''))
        .nullable(),
      notes: string().trim().min(0, notes.length).max(256, notes.length).trim().optional().or(literal('')).nullable(),
    }),
    personnelRecord: object({
      code: string().trim().optional().or(literal('')).nullable(),
      department: string({
        required_error: personnelRecordDepartment.required,
      }),
      jobTitles: array(enum_([JobTitleEnum.CONSULTANT, JobTitleEnum.LECTURER, JobTitleEnum.SALES_PERSONNEL]), {
        required_error: jobTitles.required,
      }).min(1, jobTitles.required),
      directionManager: string().optional().or(literal('')).nullable(),
      workStatus: enum_(
        [WorkStatus.MATERNITY_LEAVE, WorkStatus.TERMINATED, WorkStatus.UNPAID_LEAVE, WorkStatus.WORKING],
        { required_error: workStatus.required },
      ),
      contractType: enum_([ContractType.FULL_TIME, ContractType.PART_TIME]).optional().nullable(),
      contractStartEffectDate: string().optional().or(literal('')).nullable(),
      contractEndEffectDate: string().optional().or(literal('')).nullable(),
    }),
    roleSystem: object({
      roles: array(enum_([Role.Admin, Role.Consultant, Role.Lecturer, Role.Sale, Role.Student]), {
        required_error: roles.required,
      }).min(1, roles.required),
      username: string({ required_error: username.required })
        .trim()
        .min(5, username.length)
        .max(12, username.length)
        .regex(/^[\p{L}0-9]*$/u, username.invalid),
      accessStatus: enum_([SystemAccessStatus.BLOCKED, SystemAccessStatus.GRANTED], {
        required_error: accessStatus.required,
      }),
      password: needPassword
        ? string({ required_error: password.required })
            .min(8, password.length)
            .max(12, password.length)
            .regex(isStrongPassword, password.invalid)
        : string().trim().or(literal('')).optional().nullable(),
    }),
  });
};

export const getFormMutationResolver = ({
  needPassword,
  t,
}: {
  t: TFunction<['common', 'employee']>;
  needPassword: boolean;
}) => {
  return zodResolver(getFormMutationSchema({ needPassword, t }));
};
