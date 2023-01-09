package teamproject.backend.boardTag;

import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardTag;
import teamproject.backend.domain.Tag;

import java.util.List;

public interface BoardTagService {
    void saveTags(Board board, String tagName);
    void deleteAllByBoard(Board board);
    List<BoardTag> findBoardTagByBoard(Board board);
    String findTagsByBoard(Board board);
    List<BoardTag> findBoardTagByTagName(String tagName);
    List<Board> findBoardByTagName(String tagName);
}
