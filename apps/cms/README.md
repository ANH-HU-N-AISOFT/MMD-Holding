# Architecture

###

Clean architecture `cho Web` tức "Framework & Drivers" sẽ không phải là loại ứng dụng (Web, Mobile, DB, ...) mà là

- các doanh nghiệp, các bên sử dụng app
- các framework base trên reactjs khác nhau như nextjs, remixjs, ...

### Fundamentals

- Lấy "packages" làm logic nghiệp vụ. Tại đây sẽ viết các component chức năng, những ràng buộc theo tài liệu của BA

  - Ví dụ với chức năng CRUD khách hàng sẽ có 3 màn với các chức năng tương ứng
    - Listing: Tìm kiếm, Import, Export, Delete, ...
    - Create: Form tạo bản ghi
    - Update: Form update bản ghi

- Layout sắp xếp sao sẽ phụ thuộc vào các bên yêu cầu + framework base trên react
  - Ví dụ với remixjs, các route sẽ được viết trong folder "routes" => Tại đây sẽ ghép các API của BE, API của remixjs và các component được export trong "packages" để ghép thành 1 page hoàn chỉnh
  - Tương tự với nextjs, ...

# Fundamentals

- CMS sử dụng react-router để có thể migrate remixjs một cách dễ dàng cũng như code convention, folder structure giống nhau
- Clean architecture CHO WEB APPLICATIONS
  - Lấy "packages" làm bussiness logic
- Folder structure
  - "src/@types": Chứa type definition global share qua toàn bộ app
  - "src/components": Chứa các component UI share qua toàn bộ app. Những component có sử dụng i18n phải được viết trong "components.json"
  - "src/layouts": Chứa các component layout cho route
  - "src/overrides": Overrides lại các lib từ remixjs -> react-router để giữ code convention
  - "src/packages/specific": Đóng gói package chức năng (thường là theo từng màn hình trong design).
    - "components": Chứa các component UI
    - "models": Chứa các model của chức năng
    - "services": API
    - "types": Chứa các type liên quan đến các chức năng như SearchParams, Route id, ...
    - "utils": Chứa type utility sử dụng trong package
