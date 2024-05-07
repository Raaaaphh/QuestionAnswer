import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    test() {
        return 'Hello World ! depuis le Back';
    }
}