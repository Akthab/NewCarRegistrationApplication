package net.carbackend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api")

public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/")
	public List<User> GetUsers() {
		return userRepository.findAll();
	}
	
	
	@GetMapping("/{id}")
	public User GetUser(@PathVariable Integer id) {
		return userRepository.findById(id).orElse(null);	
	}
	
	@PostMapping("/")
	public User PostUser(@RequestBody User user){
		return userRepository.save(user);
	}
	
	@PutMapping("/")
	public User PutUser(@RequestBody User user) {
		User oldUser = userRepository.findById(user.getId()).orElse(null);
		oldUser.setBrandName(user.getBrandName());
		oldUser.setVehicleNumber(user.getVehicleNumber());
		oldUser.setChasisNumber(user.getChasisNumber());
		return userRepository.save(oldUser);
	}
	
	@DeleteMapping("/{id}")
	public Integer DeleteUser(@PathVariable Integer id) {
		userRepository.deleteById(id);
		return id;
	}
	
	
}
