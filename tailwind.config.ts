
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
                // Custom colors for PatchItUp
                primary: {
                    DEFAULT: '#6C63FF', // Purple
                    foreground: '#FFFFFF',
                    light: '#8F88FF',
                    dark: '#5A52D5'
                },
                secondary: {
                    DEFAULT: '#7ED957', // Lime Green
                    foreground: '#FFFFFF',
                    light: '#A1E47C',
                    dark: '#65B142'
                },
                accent: {
                    DEFAULT: '#FFC93C', // Amber
                    foreground: '#2D2D2D'
                },
                alert: {
                    DEFAULT: '#FF6B6B', // Coral Red
                    foreground: '#FFFFFF'
                },
                charcoal: {
                    DEFAULT: '#2D2D2D',
                    light: '#4A4A4A'
                },
                softWhite: {
                    DEFAULT: '#F9FAFB',
                    darker: '#E5E7EB'
                },
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'bounce-in': {
                    '0%': {
                        transform: 'scale(0.8)',
                        opacity: '0'
                    },
                    '70%': {
                        transform: 'scale(1.1)',
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: '1'
                    }
                },
                'slide-up': {
                    '0%': {
                        transform: 'translateY(20px)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                },
                'pulse-badge': {
                    '0%, 100%': {
                        transform: 'scale(1)'
                    },
                    '50%': {
                        transform: 'scale(1.1)'
                    }
                },
                'slide-right': {
                    '0%': {
                        transform: 'translateX(-100%)'
                    },
                    '100%': {
                        transform: 'translateX(0)'
                    }
                },
                'slide-left': {
                    '0%': {
                        transform: 'translateX(100%)'
                    },
                    '100%': {
                        transform: 'translateX(0)'
                    }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'bounce-in': 'bounce-in 0.5s ease-out forwards',
                'slide-up': 'slide-up 0.4s ease-out forwards',
                'pulse-badge': 'pulse-badge 0.6s ease-in-out',
                'slide-right': 'slide-right 0.3s ease-out forwards',
                'slide-left': 'slide-left 0.3s ease-out forwards'
			},
            boxShadow: {
                'card': '0 4px 12px rgba(0, 0, 0, 0.1)',
                'button': '0 4px 8px rgba(108, 99, 255, 0.2)',
                'hover': '0 8px 16px rgba(0, 0, 0, 0.12)'
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
