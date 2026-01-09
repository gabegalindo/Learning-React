import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wawbytwmofglacqodaxp.supabase.co";
const supabaseKey = "sb_publishable_kV08exHGnlpes5lmyC7CsQ_qSyB8xV7";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
