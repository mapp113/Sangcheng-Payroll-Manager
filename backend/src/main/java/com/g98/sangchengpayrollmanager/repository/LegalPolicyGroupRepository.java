package com.g98.sangchengpayrollmanager.repository;

import com.g98.sangchengpayrollmanager.model.entity.LegalPolicyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.List;

public interface LegalPolicyGroupRepository extends JpaRepository<LegalPolicyGroup, Integer> {
    @Query("""
        SELECT g.policy.code, g.componentType.id
        FROM LegalPolicyGroup g
        WHERE g.policy.code IS NOT NULL
          AND g.componentType.id IS NOT NULL
        """)
    List<Object[]> findAllPolicyComponentPairs();

    /**
     * Gom tất cả các mapping group -> list componentTypeId
     */
    default Map<String, List<Integer>> loadGroupMapping() {
        List<Object[]> rows = findAllPolicyComponentPairs();

        return rows.stream()
                .collect(Collectors.groupingBy(
                        row -> (String) row[0], // policyCode
                        Collectors.mapping(
                                row -> (Integer) row[1], // componentTypeId
                                Collectors.toList()
                        )
                ));
    }
}
