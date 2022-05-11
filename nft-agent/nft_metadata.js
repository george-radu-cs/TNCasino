// TODO those data may change in future, not final yet
export const nfT_metadata = {
  coin_value: [0.5, 1, 2.5, 5, 10, 25, 50, 100],
  free_spins_left: [10, 25, 50, 100, 200, 500],
  volatility: ["low", "medium", "high"],
  max_multiplier: [500, 1000, 3000, 5000, 10000, 50000],
  max_allowed_bets: [0, 1, 3, 5],
  bonus_feature: ["low_risk", "high_risk"],
  allowed_additional_games: [
    "none",
    "roulette",
    "blackjack",
    "poker",
    "blackjack_roulette",
    "poker_roulette",
    "blackjack_poker",
    "blackjack_poker_roulette",
  ],
};

export const nft_probabilities = {
  coin_value: [0.3, 0.55, 0.75, 0.9, 0.97, 0.99, 0.9995, 1],
  free_spins_left: [0.4, 0.75, 0.95, 0.97, 0.9995, 1],
  volatility: [0.5, 0.9, 1],
  max_multiplier: [0.3, 0.55, 0.75, 0.9, 0.99, 1],
  max_allowed_bets: [0.4, 0.7, 0.9, 1],
  bonus_feature: [0.8, 1],
  allowed_additional_games: [0.5, 0.75, 0.89, 0.998, 0.99, 0.997, 0.9999, 1],
};

export const nft_svg_template = `<svg
  viewBox="0 0 500 750"
  style="background-color:black"
  xmlns="http://www.w3.org/2000/svg"
>
  <text
    class="text"
    x="0"
    y="5"
    font-family="Verdana"
    font-size="20"
    fill="gold"
  >
    <tspan x="20" dy="1.2em">
      TNCasino
    </tspan>
  </text>
  <text
    class="text"
    x="0"
    y="50"
    font-family="Verdana"
    font-size="20"
    fill="gold"
  >
    <tspan x="20" dy="1.2em">
      id = REPLACE_ID
    </tspan>
    <tspan x="20" dy="1.2em">
      coin_value = REPLACE_COIN_VALUE
    </tspan>
    <tspan x="20" dy="1.2em">
      free_spins_left = REPLACE_FREE_SPINS_LEFT
    </tspan>
    <tspan x="20" dy="1.2em">
      volatility = REPLACE_VOLATILITY
    </tspan>
    <tspan x="20" dy="1.2em">
      max_multiplier = REPLACE_MAX_MULTIPLIER
    </tspan>
    <tspan x="20" dy="1.2em">
      max_allowed_bets = REPLACE_MAX_ALLOWED_BETS
    </tspan>
    <tspan x="20" dy="1.2em">
      bonus_feature = REPLACE_BONUS_FEATURE
    </tspan>
    <tspan x="20" dy="1.2em">
      allowed_additional_games = REPLACE_ALLOWED_ADDITIONAL_GAMES
    </tspan>
  </text>
</svg>
`;
