import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {SectionModel} from './section-model';

@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class SectionStore {
  private planeToSections = new Map<number, BehaviorSubject<SectionModel[]>>();

  getSections(planeObjectId: number): Observable<SectionModel[]> {
    if (!this.planeToSections.has(planeObjectId)) {
      this.planeToSections.set(planeObjectId, new BehaviorSubject([]));
    }
    return this.planeToSections.get(planeObjectId).asObservable();
  }

  updateSection(planeObjectId: number, section: SectionModel) {
    // console.log('*****UPDATING SECTIONS*****');
    const sectionId = section.seatType.objectId;
    if (sectionId === undefined) {
      throwError('Cannot update section, seat type of which does not have objectId');
      return;
    }
    // console.log('planeId=' + planeObjectId);
    const sectionsSubject = this.planeToSections.get(planeObjectId);
    const oldSections = sectionsSubject.getValue();
    // console.log('old:');
    // console.log(oldSections);
    for (let i = 0; i < oldSections.length; i++) {
      if (oldSections[i].seatType.objectId === sectionId) {
        oldSections[i] = section;
        sectionsSubject.next(oldSections);
        return;
      }
    }
    oldSections.push(section);
    // console.log('new:');
    // console.log(oldSections);
    sectionsSubject.next(oldSections);
  }

  clear(planeObjectId: number) {
    this.planeToSections.delete(planeObjectId);
  }
}

/*export class SectionStore {
  private sections = new BehaviorSubject<SectionModel[]>([]);

  getSections(): Observable<SectionModel[]> {
    return this.sections.asObservable();
  }

  updateSection(section: SectionModel) {
    const sectionId = section.seatType.objectId;
    if (sectionId === undefined) {
      throwError('Cannot update section, seat type of which does not have objectId');
      return;
    }
    const sectionsSubject = this.sections;
    const oldSections = sectionsSubject.getValue();
    for (let i = 0; i < oldSections.length; i++) {
      if (oldSections[i].seatType.objectId === sectionId) {
        oldSections[i] = section;
        sectionsSubject.next(oldSections);
        return;
      }
    }
    oldSections.push(section);
    sectionsSubject.next(oldSections);
  }

  clear() {
    this.sections.next([]);
  }
}*/
