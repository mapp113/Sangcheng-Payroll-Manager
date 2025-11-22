package com.g98.sangchengpayrollmanager.controller;


import com.g98.sangchengpayrollmanager.model.dto.InsurancePolicyDTO;
import com.g98.sangchengpayrollmanager.model.dto.insurancepolicy.InsurancePolicyResponse;
import com.g98.sangchengpayrollmanager.service.InsurancePolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/config/insurance-policy")
@RequiredArgsConstructor
public class InsurancePolicyController {

    private final InsurancePolicyService insurancePolicyService;

    @GetMapping
    public List<InsurancePolicyResponse> getInsurancePolicy() {
        return insurancePolicyService.getAllInsurancePolicies();
    }

    @PostMapping
    public InsurancePolicyResponse addInsurancePolicy(@RequestBody InsurancePolicyDTO request) {
        return insurancePolicyService.addInsurancePolicy(request);
    }

    @PutMapping("/{id}")
    public InsurancePolicyResponse updateInsurancePolicy(@PathVariable Integer id,
                                                         @RequestBody InsurancePolicyDTO request) {
        return insurancePolicyService.updateInsurancePolicy(id,request);
    }

    @DeleteMapping("/{id")
    public InsurancePolicyResponse deleteInsurancePolicy(@PathVariable Integer id) {
        insurancePolicyService.deleteInsurancePolicy(id);
        return InsurancePolicyResponse.builder().build();
    }
}
