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
    this.ensurePlaneEntryExists(planeObjectId);
    return this.planeToSections.get(planeObjectId).asObservable();
  }

  updateSection(planeObjectId: number, section: SectionModel) {
    this.ensurePlaneEntryExists(planeObjectId);

    const sectionId = section.seatType.objectId;
    if (!sectionId) {
      throwError('Cannot update section, seat type of which does not have objectId');
      return;
    }

    const sectionsSubject = this.planeToSections.get(planeObjectId);
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

  private ensurePlaneEntryExists(planeId: number) {
    if (!this.planeToSections.has(planeId)) {
      this.planeToSections.set(planeId, new BehaviorSubject([]));
    }
  }

  clear(planeObjectId: number) {
    this.planeToSections.delete(planeObjectId);
  }
}
