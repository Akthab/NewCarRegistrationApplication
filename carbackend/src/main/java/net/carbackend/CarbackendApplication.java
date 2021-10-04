package net.carbackend;

/*import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;*/
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class CarbackendApplication {//implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(CarbackendApplication.class, args);
	}
	
	/*@Autowired
	private UserRepository userRepository;
	
	@Override
	public void run(String... args) throws Exception{
		this.userRepository.save(new User("Ramesh","ra","ramsehgmail.com"));
		this.userRepository.save(new User("Ramesh","Faratare","amsehgmail.com"));
		this.userRepository.save(new User("Ramesh","Faratare","ramsehgmail.com"));
		
	}*/

}
