import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = [];

// check the Node docs for details on the EventEmitter api
class CourseStore extends EventEmitter {
  // required implementation
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  // required implementation
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  // required implementation
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find((course) => course.slug === slug);
  }
}

const store = new CourseStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_COURSE:
      debugger;
      _courses = _courses.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});

export default store;
