# lang-zp-english-example.py

name = "English"
version = "0.1"
author = "Amirali"

commands = {
    "say": "print",
    "set": "var",
    "if": "if",
}

def process(command, variables):
    """Input: command string, Output: (status, message, updated_variables)"""
    command = command.strip()
    
    # Test command (for initial testing)
    if command == "test":
        return "OK", "✅ english lang working! ", variables
    
    # Print command
    elif command.startswith("say"):
        rest = command[3:].strip()
        if rest.startswith("var"):
            var_name = rest[3:].strip()
            if var_name in variables:
                return "OK", str(variables[var_name]), variables
            else:
                return "ERROR", f"❌ Variable '{var_name}' not defined", variables
        else:
            return "OK", rest, variables
    
    # Variable assignment
    elif command.startswith("set"):
        rest = command[3:].strip()
        if "=" not in rest:
            return "ERROR", "❌ Invalid format. Must include '='.", variables
        
        parts = rest.split("=", 1)
        var_name = parts[0].strip()
        var_value = parts[1].strip()
        
        if var_name and var_value:
            variables[var_name] = var_value
            return "OK", f"✅ Variable {var_name} = {var_value}", variables
        else:
            return "ERROR", "❌ Variable name or value is empty", variables
    
    else:
        return "ERROR", f"❌ Unknown command: {command}", variables
