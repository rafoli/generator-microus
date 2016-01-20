package <%= props.packageName %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;<% if (props.microserviceType.indexOf('eurekaClient') > -1) { %>
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;<% } else { %>
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;<% } %>
<% if (props.microserviceType.indexOf('springAdmin') > -1) { %>
import de.codecentric.boot.admin.config.EnableAdminServer;<% } %>

@SpringBootApplication<% if (props.microserviceType.indexOf('eurekaServer') > -1) { %>
@EnableEurekaServer<% } else { %>
@EnableEurekaClient<% } if (props.microserviceType.indexOf('springAdmin') > -1) { %>
@EnableAdminServer<% } %>
public class <%= props.appName %>Application {
	public static void main(String[] args) {

		SpringApplication.run(<%= props.appName %>Application.class,args);
		
	}
	
}
