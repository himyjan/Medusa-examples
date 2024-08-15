import DigitalProductModuleService from "./service"
import { Module } from "@medusajs/utils"

export const DIGITAL_PRODUCT_MODULE = "digitalProductModuleService"

export default Module(DIGITAL_PRODUCT_MODULE, {
  service: DigitalProductModuleService,
})