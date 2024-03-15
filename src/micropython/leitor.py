import network
import urequests as requests
import machine
import time 
import ujson

ssid = 'Inteli.Iot'
password = '@Intelix10T#'

def ler():
    ir = machine.ADC(26)
    a = ir.read_u16()
    time.sleep(0.1)
    b = ir.read_u16()
    time.sleep(0.1)
    c = ir.read_u16()
    return (a+b+c)/3 < 5000

url =  "http://10.128.0.15:5000/manda"
headers = {'X-AIO-Key': 'xxxxxxxxxxxxxxxxxxx',
           'Content-Type': 'application/json'}
def connect_to_wifi(ssid, psk):
    # Enable Wifi in Client Mode
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    # Connect to Wifi, keep trying until failure or success
    wlan.connect(ssid, psk)

    while not wlan.isconnected() and wlan.status() >= 0:
        print("Waiting to Connect")
        time.sleep(1)
    if not wlan.isconnected():
        raise Exception("Wifi not available")
    print("Connected to WiFi")

connect_to_wifi(ssid, password)

while True:
    try:
        url = "http://10.128.0.15:5000/manda"
        headers = { "Content-Type": "application/json" }
       
        insertPayload = ujson.dumps({"ir": ler()})
        
        print("sending...")
        
        start_time = time.ticks_ms()
        
        response = requests.post(url, headers=headers, data =insertPayload)
        
        end_time = time.ticks_ms()
        content = response.headers
        print(content)
      
        print("Response: (" + str(response.status_code) + "), msg = " + str(response.text))

        if response.status_code == 201:
            print("Added Successfully")
        else:
            print("Error")

        # Always close response objects so we don't leak memory
        response.close()
        elapsed_time = end_time - start_time
        print("Request time: {} ms".format(elapsed_time))

    except Exception as e:
        print(e)






