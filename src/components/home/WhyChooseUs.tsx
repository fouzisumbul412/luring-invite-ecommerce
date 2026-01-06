import { motion } from 'framer-motion';
import { Sparkles, Award, Clock, Users, HeadphonesIcon, Cpu } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: "Unparalleled Personalization",
    description: "We believe in the power of personalization. Each invitation is a canvas for your unique story, allowing you to add personal touches, themes, and colours that resonate with your event"
  },
  {
    icon: Award,
    title: "Exceptional Quality",
    description: "We are committed to delivering invitations of the highest quality. Our attention to detail ensures that every element, from graphics to wording, is meticulously crafted to perfection."
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We understand the importance of timelines for your event. Count on us for prompt and reliable delivery of your invitations, allowing you and your guests ample time to prepare for the celebration."
  },
  {
    icon: Users,
    title: "Collaborative Design Process",
    description: "Enjoy a collaborative design process where your ideas meet our expertise. We value your input, working closely with you to create invitations that surpass expectations and align with your vision."
  },
  {
    icon: HeadphonesIcon,
    title: "Responsive Customer Support",
    description: "Our dedicated customer support team is here to assist you at every step. Have questions or need adjustments to your invitations? We're just a message or call away, ensuring a smooth and stress-free experience."
  },
  {
    icon: Cpu,
    title: "Cutting-Edge Technology",
    description: "Embrace the latest in invitation design technology. We stay ahead of the curve, incorporating innovative design tools and techniques to bring modern, fresh, and visually stunning invitations to life."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Why Choose <span className="text-primary">Luring Invite?</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Captivate your guests with captivating video, stunning static, and elegant stationary invitations. 
            Elevate your event with our unparalleled invitation designs.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 lg:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
