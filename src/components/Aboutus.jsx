import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      bio: "PhD in Computer Science with focus on NLP and transformer architecture. Leading the model development and optimization efforts.",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      name: "Alex Rodriguez",
      role: "Accessibility Specialist",
      bio: "Expert in designing accessible technology solutions with 8+ years working with visually impaired users. Ensures our platform meets all accessibility standards.",
      avatar: "https://i.pravatar.cc/150?img=65"
    },
    {
      name: "Priya Sharma",
      role: "Voice Integration Engineer",
      bio: "Specialized in speech recognition and synthesis technologies. Builds and optimizes the voice assistance components of our platform.",
      avatar: "https://i.pravatar.cc/150?img=47"
    }
  ];

  return (
    <section id="about-us" className="about-us">
      <div className="section-container">
        <h2 className="section-title">About Us</h2>
        <div className="divider"></div>
        
        <p className="about-us-intro">
          We are a passionate team committed to making technology accessible for everyone. 
          Our focus is on leveraging AI to break down barriers and create empowering solutions.
        </p>
        
        <div className="team-grid">
          {team.map((member, index) => (
            <div className="team-member" key={index}>
              <div className="avatar-placeholder" aria-label={`Avatar for ${member.name}`}>
                {member.name.split(' ').map(name => name[0]).join('')}
              </div>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;