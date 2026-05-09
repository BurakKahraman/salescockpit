import csv

def clean_csv():
    with open('data/leads.csv', 'r') as infile:
        lines = infile.readlines()
        
    # The second line contains the actual headers
    header_line = lines[1].strip()
    headers = [h.strip() for h in header_line.split(',')]
    
    # We only care about columns that have actual names, ignoring empty ones and 'Column X'
    valid_indices = []
    clean_headers = []
    
    for i, h in enumerate(headers):
        if h and not h.startswith("Column") and h != "Month" and h != "DAY":
            valid_indices.append(i)
            # Normalize header names for JSONB
            if h == "PHONE CALL?": h = "PhoneCall"
            elif h == "EMAIL Sent": h = "EmailSent"
            elif h == "EVENT DATE": h = "EventDate"
            elif h == "INQUIRY DATE": h = "InquiryDate"
            elif h == "Sales Rep": h = "SalesRep"
            elif h == " PRODUCT": h = "Product"
            else: h = h.title()
            clean_headers.append(h)
            
    # Process rows
    clean_rows = []
    for line in lines[2:]:
        if not line.strip(): continue
        # Basic split by comma (assuming no commas inside quotes in this specific file based on preview)
        cols = [c.strip() for c in line.strip().split(',')]
        
        # If the row is just empty commas or "First Touch", skip it
        if len(cols) < 5 or not any(cols[1:4]): 
            continue
            
        row = []
        for i in valid_indices:
            val = cols[i] if i < len(cols) else ""
            row.append(val)
            
        clean_rows.append(row)

    # Write cleaned CSV
    with open('data/leads.csv', 'w') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(clean_headers)
        for row in clean_rows:
            writer.writerow(row)

if __name__ == "__main__":
    clean_csv()
