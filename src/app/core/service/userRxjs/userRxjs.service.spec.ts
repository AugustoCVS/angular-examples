import { TestBed } from "@angular/core/testing";
import { UserRxjsService } from "./userRxjs.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { IUserResponse } from "../user/interfaces/user";
import { provideHttpClient } from "@angular/common/http";
import { take } from "rxjs";

describe('UserRxjsService', () => {
  let service: UserRxjsService;
  let httpMock: HttpTestingController;

  const userId = '123'

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRxjsService,
        provideHttpClient(),
        provideHttpClientTesting()]
    });
    service = TestBed.inject(UserRxjsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user info by ID', () => {
    const mockUser: IUserResponse = { name: 'John Doe', email: 'john@example.com' };

    service.getUserInfoById({ userId });

    const req = httpMock.expectOne(`${service['ApiUrl']}/users/${userId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockUser);
  });

  it('should update user$ when user info is fetched', () => {
    const mockUser: IUserResponse = { name: 'John Doe', email: 'john@example.com' };

    service.getUserInfoById({ userId });
    const req = httpMock.expectOne(`${service['ApiUrl']}/users/${userId}`);
    req.flush(mockUser);

    service.getUserInfo()
      .pipe(take(1))
      .subscribe(user => {
        expect(user).toEqual(mockUser);
      });
  });

});
