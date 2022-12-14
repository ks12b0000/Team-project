package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.mainPage.dto.SearchByResponse;
import teamproject.backend.mypage.dto.BoardByUserResponse;
import teamproject.backend.mypage.dto.LikeByUserResponse;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor
public class Board{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long board_id;

    //글 작성자, FK(외래키 - User)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private FoodCategory category;

    //글 제목
    @Column(length = 50, nullable = false)
    private String title;

    //글 내용
    @Column
    private String text;

    //글 작성 시간
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @Column
    private String thumbnail;

    @Column(nullable = true)
    private Integer liked; // 좋아요 수

    public Board(FoodCategory foodCategory, BoardWriteRequest boardWriteRequest, User user) {
        this.category = foodCategory;
        this.title = boardWriteRequest.getTitle();
        this.text = boardWriteRequest.getText();
        this.user = user;
        this.createDate = new Date(System.currentTimeMillis());
        this.thumbnail = boardWriteRequest.getThumbnail();
        this.liked = 0;
    }

    public void update(BoardWriteRequest boardWriteRequest, FoodCategory foodCategory){
        this.thumbnail = boardWriteRequest.getThumbnail();
        this.title = boardWriteRequest.getTitle();
        this.text = boardWriteRequest.getText();
        this.category = foodCategory;
    }

    public void increaseLikeCount() {
        this.liked += 1;
    }

    public void decreaseLikeCount() {
        this.liked -= 1;
    }

    public BoardByUserResponse toDto(){
        return BoardByUserResponse.builder()
                .board_id(board_id)
                .category_id(category.getCategory_id())
                .title(title)
                .user_id(user.getId())
                .thumbnail(thumbnail)
                .build();
    }

    public SearchByResponse toSearchDto(){
        return SearchByResponse.builder()
                .board_id(board_id)
                .category_id(category.getCategory_id())
                .title(title)
                .user_id(user.getId())
                .thumbnail(thumbnail)
                .build();
    }
}
