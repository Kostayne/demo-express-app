import { ServerErr } from './server.error';

export class BadRequestErr extends ServerErr {
    public code = 400;
}