export default class BukcetLecturer {
  constructor(lecturer) {
    this.id = lecturer.id;
    this.lecturerId = lecturer.lecturer_id;
    this.email = lecturer.email;
    this.firstName = lecturer.first_name;
    this.lastName = lecturer.last_name;
    this.name = `${this.firstName} ${this.lastName}`;
    this.contactNumber = lecturer.contact_number;
    this.image = lecturer.image;
    this.role = lecturer.role;
    this.blocked = lecturer.blocked;
    this.department = lecturer.department;
  }
}
