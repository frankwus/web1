

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of } from "rxjs";
import {Course} from "../model/course";
import {map} from "rxjs/operators";
import {Lesson} from "../model/lesson";
import { LESSONS, COURSES } from "../db-data";

@Injectable()
export class CoursesService {
  //lessons: Observable<Lesson[]> = of(LESSONS)
  //courses: Observable<Course[]> = of(COURSES)
  lessons: Lesson[];// = LESSONS
  courses: Course[] = (COURSES)
  constructor(private http: HttpClient) {

    }

  findCourseById(courseId: number): Observable<Course> {
      return of (this.courses[0])
        return  this.http.get<Course>(`/api/courses/${courseId}`);
    }

  findAllCourses(): Observable<Course[]> {
      return of (this.courses)
        return this.http.get('/api/courses')
            .pipe(
                map(res => res['payload'])
            );
    }
  test() {
    let l = new Lesson()
    l.id = 1
    l.description = 'test'
    l.courseId = 1
    this.lessons=[ l]
    this.lessons.push(l)
  }
  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    this.test()
    return of(this.lessons)
        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('pageNumber', "0")
                .set('pageSize', "1000")
        }).pipe(
            map(res =>  res["payload"])
        );
    }

    findLessons(
        courseId:number, filter = '', sortOrder = 'asc',
      pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
      this.test()
      return of(this.lessons)
        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );
    }

}
