// src/utils/serialize.ts
export const serializeUser = (user: any) => {
  return {
    id: user.id.toString(), // Convert BigInt to string
    name: user.name,
    email: user.email,
    gender: user.gender,
    whatsapp: user.whatsapp,
    telephone: user.telephone,
    id_card: user.id_card,
    npwp: user.npwp,
    role_id: user.role_id,
    created_at: user.created_at,
    updated_at: user.updated_at
  };
};
