package teamproject.backend.user;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.User;
import teamproject.backend.user.dto.JoinRequest;
import teamproject.backend.user.dto.LoginRequest;
import teamproject.backend.user.dto.LoginResponse;
import teamproject.backend.utils.CookieService;
import teamproject.backend.utils.JwtService;
import teamproject.backend.utils.SHA256;
import javax.servlet.http.HttpServletResponse;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Transactional
@Slf4j
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserServiceImpl userService;
    @Mock
    private UserRepository userRepository;
    @Mock
    HttpServletResponse response;
    @Spy
    SHA256 sha256;
    @Mock
    private JwtService jwtService;
    @Mock
    private CookieService cookieService;

    @Test
    public void join_Test() {
        // given
        JoinRequest dto = new JoinRequest("test1234", "test1234@gmail.com", "test1234");

        User user = new User(dto.getUsername(), dto.getEmail(), dto.getPassword());
        // stub 행동정의 (가설)
        when(userRepository.save(any())).thenReturn(user);

        // when
        userService.join(dto);

        // then
        assertThat(user.getUsername()).isEqualTo("test1234");
        assertThat(user.getEmail()).isEqualTo("test1234@gmail.com");
        assertThat(user.getPassword()).isEqualTo("test1234");
    }

    @Test
    public void join_중복Test() {
        // given
        JoinRequest dto = new JoinRequest("test1234", "test1234@gmail.com", "test1234");
        userService.join(dto);
        // stub 행동정의 (가설)
        when(userRepository.save(any())).thenReturn(dto);

        // when
        JoinRequest dto2 = new JoinRequest("test1234", "test1234@gmail.com", "test1234");

        // then
        assertThrows(RuntimeException.class, () -> userService.join(dto2));
    }

//    @Test
//    public void login_Test() {
//        // given
//        JoinRequest dto = new JoinRequest("test1234asdasdasd", "test1234asdasdasd@gmail.com", "test1234");
//
//        User user = new User(dto.getUsername(), dto.getEmail(), dto.getPassword());
//        // stub 행동정의 (가설)
//        when(userRepository.save(any())).thenReturn(user);
//        userService.join(dto);
//
//        // when
//        LoginRequest loginRequest = new LoginRequest("test1234asdasdasd", "test1234", true);
//
//        when(userRepository.findByUsernameAndPassword(loginRequest.getUsername(), SHA256.encrypt(loginRequest.getPassword()))).thenReturn(user);
//        LoginResponse login = userService.login(loginRequest, response);
//
//        // then
//        assertThat(user.getId()).isEqualTo(login.getId());
//    }
}
