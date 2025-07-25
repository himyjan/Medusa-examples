import {
  Modules,
  TransactionHandlerType,
} from "@medusajs/framework/utils";
import { StepResponse, createStep } from "@medusajs/framework/workflows-sdk";
import { Delivery } from "../../../modules/delivery/types";
import { handleDeliveryWorkflowId } from "../../delivery/workflows/handle-delivery";

type SetStepFailedtepInput = {
  stepId: string;
  updatedDelivery: Delivery;
};

export const setStepFailedStep = createStep(
  "set-step-failed-step",
  async function (
    { stepId, updatedDelivery }: SetStepFailedtepInput,
    { container }
  ) {
    const engineService = container.resolve(
      Modules.WORKFLOW_ENGINE
    );

    await engineService.setStepFailure({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId: updatedDelivery.transaction_id,
        stepId,
        workflowId: handleDeliveryWorkflowId,
      },
      stepResponse: new StepResponse(updatedDelivery, updatedDelivery.id),
    });
  }
);
