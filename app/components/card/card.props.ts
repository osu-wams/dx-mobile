export interface CardProps {
  collapsing?: boolean;
}

export interface CardCollapseProps {
  collapsed: boolean;
  collapsible: boolean;
  flush?: boolean;
}

export interface CardBadgeProps {
  fg?: string;
  bg?: string;
}

export interface CardContentRowProps {
  borderless?: boolean;
}

export interface FeaturedCardProps {
  featured?: boolean;
}
