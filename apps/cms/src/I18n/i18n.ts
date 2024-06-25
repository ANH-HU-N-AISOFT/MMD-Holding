import i18n, { Namespace, TFunction } from 'i18next';
import Languagedetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { AuthLocales } from '~/packages/common/Auth/locales';
import { LocationLocales } from '~/packages/extends/Location/locales';
import { AppointmentLocales } from '~/packages/specific/Appointment/locales';
import { ConsultantFormLocales } from '~/packages/specific/ConsultantForm/locales';
import { ContractLocales } from '~/packages/specific/Contract/locales';
import { CourseLocales } from '~/packages/specific/Course/locales';
import { CourseComboLocales } from '~/packages/specific/CourseCombo/locales';
import { CourseRoadmapLocales } from '~/packages/specific/CourseRoadmap/locales';
import { DepartmentLocales } from '~/packages/specific/Department/locales';
import { DocumentTemplateLocales } from '~/packages/specific/DocumentTemplate/locales';
import { EmployeeLocales } from '~/packages/specific/Employee/locales';
import { PromotionLocales } from '~/packages/specific/Promotion/locales';
import { RegistrationFormLocales } from '~/packages/specific/RegistrationForm/locales';
import { StudentLocales } from '~/packages/specific/Student/locales';
import { TrialRequestLocales } from '~/packages/specific/TrialRequest/locales';

const resources = {
  en: {
    appointment: AppointmentLocales.en,
    consultant_form: ConsultantFormLocales.en,
    course_combo: CourseComboLocales.en,
    course_roadmap: CourseRoadmapLocales.en,
    department: DepartmentLocales.en,
    employee: EmployeeLocales.en,
    promotion: PromotionLocales.en,
    registration_form: RegistrationFormLocales.en,
    student: StudentLocales.en,
    trial_request: TrialRequestLocales.en,
    location: LocationLocales.en,
    auth: AuthLocales.en,
    course: CourseLocales.en,
    document_template: DocumentTemplateLocales.en,
    contract: ContractLocales.en,

    enum: {
      gender: {
        label: 'Giới tính',
        options: {
          male: 'Nam',
          female: 'Nữ',
        },
      },
      role: {
        label: 'Phân quyền',
        options: {
          SuperAdmin: 'Super admin',
          Admin: 'Admin',
          Sale: 'Nhân viên sales',
          Lecturer: 'Giảng viên',
          Student: 'Học viên',
          Consultant: 'Tư vấn viên',
        },
      },
      systemAccessStatus: {
        label: 'Trạng thái truy cập',
        options: {
          GRANTED: 'Được quyền truy cập',
          BLOCKED: 'Khóa truy cập',
        },
      },
    },
    dashboard_layout: {
      menu: {
        home: 'Trang chủ',

        organizational_structure: 'Cơ cấu tổ chức',
        department_list: 'Danh sách đơn vị',
        employee: 'Danh sách nhân viên',
        student: 'Danh sách học viên',

        appointment: 'Lịch hẹn',

        input_check: 'Kiểm tra đầu vào',

        consultation: 'Tư vấn',
        course: 'Khoá học',
        course_combo: 'Combo',
        course_roadmap: 'Lộ trình học',
        promotion: 'Chương trình KM',
        consultant_form: 'Phiếu tư vấn',
        trial_request: 'Yêu cầu học thử',

        test_study: 'Học thử',
        contract_signing: 'Ký hợp đồng',
        document_template: 'Mẫu tài liệu',
        contract_list: 'Danh sách hợp đồng',
        registration_form_list: 'Danh sách phiếu đăng ký',
      },
      logout: 'Đăng xuất',
      profile: 'Thông tin cá nhân',
      mark_all_as_read: 'Đánh dấu đã đọc tất cả',
    },
    common: {
      type_required: 'Nhập {{ type }} để tiếp tục',
      range_length: 'Trường thông tin cần có {{ from }} - {{ to }} ký tự',
      type_must_be_select: 'Chọn {{ type }} để tiếp tục',
      type_invalid: '{{type}} không hợp lệ',
      type_greater_than: '{{ type }} phải lớn hơn {{ number }}',
      add_type: 'Thêm {{ type }}',
      select_type: 'Chọn {{ type }}',
      type_greater_than_or_equal: '{{ type }} phải lớn hơn hoặc bằng {{ number }}',
      something_went_wrong: 'Đã xảy ra lỗi!',
      showing_range_result: 'Hiển thị {{ from }} đến {{ to }} trong {{ total }} kết quả',
      showing_range_results: 'Hiển thị {{ from }} đến {{ to }} trong {{ total }} kết quả',
      upload_failure: 'Upload file thất bại !',
    },
    components: {
      Modal: {
        ok: 'Xác nhận',
        cancel: 'Huỷ',
      },
      FilterDrawer: {
        filter: 'Bộ lọc',
        reset: 'Xoá bộ lọc',
        apply: 'Lọc',
      },
      ModalValidate: {
        upload_and_preview: 'Tải lên xem trước',
        title: 'Import {{ type }} từ file xlsx',
        download_sample: 'Tải xuống biểu mẫu',
        add_file: 'Chọn file',
        replace_file: 'Chọn file khác',
        error_title: 'Import thất bại',
        error_description: 'Vui lòng giữ nguyên format như file biểu mẫu',
      },
      ModalPreview: {
        title: 'Import {{ type }} từ file xlsx',
        import_error: 'Import thất bại',
        import_success: 'Import thành công',
        import_records: 'Import',
        import_and_skip_error_records: 'Import và Bỏ qua các bản ghi lỗi',
        status: 'Trạng thái',
        message: 'Ghi chú',
        valid: 'Hợp lệ',
        invalid: 'Không hợp lệ',
        all: 'Tất cả',
        warning_invaid_records_title: 'Cảnh báo! Các bản ghi không hợp lệ sẽ được bỏ qua',
        view_detail: 'Xem chi tiết',
        upload_new: 'Upload dữ liệu mới',
      },
      ModalDelete: {
        ok: 'Xoá',
        cancel: 'Huỷ bỏ',
      },
      FormMutation: {
        ok: 'Xác nhận',
        save: 'Lưu',
        cancel: 'Huỷ',
        confirm_description: 'Xác nhận để lưu bản ghi này',
      },
      Detail: {
        edit: 'Cập nhật',
        delete: 'Xoá',
      },
      Listing: {
        Table: {
          empty: 'Không có dữ liệu',
        },
      },
      Collapsed: {
        show_more: 'Xem thêm',
        show_less: 'Rút gọn',
      },
      UploadSingle: {
        choose_file: 'Chọn file',
      },
    },
    page500: {
      back_to_home: 'Quay lại trang chủ',
      title: 'Lỗi Máy Chủ Nội Bộ',
      description: 'Chúng tôi xin lỗi vì sự bất tiện này. Vui lòng thử lại sau.',
    },
    page404: {
      title: 'Không Tìm Thấy Trang',
      description: 'Xin lỗi, chúng tôi không thể tìm thấy trang này.',
      back_to_home: 'Quay lại trang chủ',
    },
    page403: {
      title: 'Truy Cập Bị Từ Chối',
      description: 'Rất tiếc, bạn không được phép truy cập trang này!',
      logout: 'Đăng xuất',
      back_to_home: 'Quay lại trang chủ',
    },
  },
};

i18n
  .use(Languagedetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    supportedLngs: ['en'],
    fallbackNS: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: {
      lookupQuerystring: 'lang',
    },
    resources,
    defaultNS: 'common',
  });

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}

export const i18nServer = {
  getFixedT: <NS extends Namespace>(_request: Request, _namespaces: NS) => {
    return Promise.resolve(i18n.t as unknown as TFunction<NS>);
  },
};
