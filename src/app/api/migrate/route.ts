import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error: error1 } = await supabase.rpc("exec_sql", {
    sql: "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username TEXT UNIQUE"
  });
  
  const { error: error2 } = await supabase.rpc("exec_sql", {
    sql: "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false"
  });

  if (error1 || error2) {
    const { error: alterError1 } = await supabase
      .from("profiles")
      .select("username")
      .limit(1);
    
    const { error: alterError2 } = await supabase
      .from("profiles")
      .select("is_public")
      .limit(1);
    
    const columnsExist = !alterError1 && !alterError2;
    
    return NextResponse.json({ 
      message: columnsExist ? "Columns already exist" : "Migration needed - please add columns manually",
      columnsExist
    });
  }

  return NextResponse.json({ success: true });
}
