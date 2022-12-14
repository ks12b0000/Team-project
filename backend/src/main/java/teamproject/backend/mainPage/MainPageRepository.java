package teamproject.backend.mainPage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.Board;

import java.util.List;

@Repository
public interface MainPageRepository extends JpaRepository<Board, Long> {

    List<Board> findByTitleContaining(@Param("keyword") String keyword);
}
