import { IncomingRequest as IncomingRequestMessage } from "../../SIPMessage";
import { SessionDialog } from "../dialogs";
import { IncomingByeRequest, IncomingRequestDelegate } from "../messages";
import { UserAgentServer } from "./user-agent-server";
export declare class ByeUserAgentServer extends UserAgentServer implements IncomingByeRequest {
    constructor(dialog: SessionDialog, message: IncomingRequestMessage, delegate?: IncomingRequestDelegate);
}