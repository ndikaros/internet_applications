package db;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONArray;
import org.json.JSONException;


import utils.ResultSetToJsonMapper;

public class Connect {

	public static JSONArray connect(String query)  {
        Connection conn = null;
        
        
        
        
        try {
            // db parameters
        	Class.forName("org.sqlite.JDBC");
            String url = "jdbc:sqlite:C:\\Users\\Afioni\\Dropbox\\koding\\javascript\\internet_applications\\db\\sci_paper.sqlite";
            // create a connection to the database
            conn = DriverManager.getConnection(url);
            
            System.out.println("Connection to SQLite has been established.");
            
            Statement stmt = null;
            
            //String query = "Select * from papers";
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            
            JSONArray response  = ResultSetToJsonMapper.mapResultSet(rs);
            
            System.out.println(response);
            
            return response;
            
            
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            JSONArray error = null;
			try {
				error = new JSONArray("[this was not a valid sql query. Please try again]");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
            return error;
        } catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
            try {
                if (conn != null) {
                	
                	
                	
                    conn.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
		try {
			return new JSONArray("[this was not a valid sql query. Please try again]");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	

	
	
}
	
	
	

