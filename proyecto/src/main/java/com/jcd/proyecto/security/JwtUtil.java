package com.jcd.proyecto.security;

import io.jsonwebtoken.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.jcd.proyecto.model.Usuario;

import java.util.Date;

/*
Se encarga de generar tokens JWT cuando un usuario inicia sesión satisfactoriamente
*/
@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(Usuario usuario) {
        JwtBuilder builder = Jwts.builder()
                .setSubject(usuario.getUsername())
                .claim("rol", "ROLE_" + usuario.getRol().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 día
                .signWith(SignatureAlgorithm.HS256, secret);

        if (usuario.getArbitro() != null) {
            builder.claim("id_arbitro", usuario.getArbitro().getIdArbitro()); // Ajusta el getter si es otro nombre
        }

        return builder.compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}
