"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundRuleFactory = void 0;
const full_refund_1 = require("./full_refund");
const no_refund_copy_1 = require("./no_refund copy");
const partial_refund_1 = require("./partial_refund");
class RefundRuleFactory {
    static getRefundRule(daysUntilCheckIn) {
        if (daysUntilCheckIn > 7) {
            return new full_refund_1.FullRefund();
        }
        else if (daysUntilCheckIn >= 1) {
            return new partial_refund_1.PartialRefund();
        }
        return new no_refund_copy_1.NoRefund();
    }
}
exports.RefundRuleFactory = RefundRuleFactory;
