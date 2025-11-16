package com.g98.sangchengpayrollmanager.repository;

import com.g98.sangchengpayrollmanager.model.entity.AttPolicy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttPolicyRepository extends JpaRepository<AttPolicy,Integer> {

    Optional<AttPolicy> findFirstByApplyScopeOrderByIdAsc(String applyScope);


}
