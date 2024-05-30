import cv2
import boto3
from botocore.signers import RequestSigner
import os
import serial

def sort_garbage(labels):
    # Define your garbage sorting logic here
    # This is just a dummy example, you should define your own rules
    sorted_garbage = {
        'recyclable': [],
        'non-recyclable': [],
        'organic': []
    }

    for label in labels:
        if label in ['Plastic', 'Metal', 'Glass', 'Paper']:
            sorted_garbage['recyclable'].append(label)
        elif label in ['Food', 'Organic Waste']:
            sorted_garbage['organic'].append(label)
        else:
            sorted_garbage['non-recyclable'].append(label)

    return sorted_garbage

def garbage_detection(frame, rekognition_client, ser):
    # Resize frame to reduce processing time (optional)
    resized_frame = cv2.resize(frame, (640, 480))

    # Convert frame to bytes
    _, img_encoded = cv2.imencode('.jpg', resized_frame)
    img_bytes = img_encoded.tobytes()

    # Detect objects using AWS Rekognition
    response = rekognition_client.detect_labels(
        Image={'Bytes': img_bytes},
        MaxLabels=20,  # Increase MaxLabels to detect more objects
        MinConfidence=50  # Decrease MinConfidence for faster detection
    )

    # Print detected labels (for debugging purposes)
    print("Detected labels:")
    for label in response['Labels']:
        print(f"  {label['Name']}: {label['Confidence']}")

    # Extract detected labels
    detected_labels = [label['Name'] for label in response['Labels']]

    # Perform garbage sorting based on detected labels
    sorted_garbage = sort_garbage(detected_labels)

    # Send command to Arduino based on garbage classification
    if 'recyclable' in sorted_garbage and sorted_garbage['recyclable']:
        ser.write(b'R')  # Recyclable detected, send 'R' to Arduino
    elif 'organic' in sorted_garbage and sorted_garbage['organic']:
        ser.write(b'O')  # Organic detected, send 'O' to Arduino
    else:
        ser.write(b'N')  # Non-recyclable detected, send 'N' to Arduino

    return sorted_garbage

def main():
    # AWS credentials
    aws_access_key_id = os.getenv('YOUR_AWS_ACCESS_KEY')
    aws_secret_access_key = os.getenv('YOUR_AWS_SECRET_ACCESS_KEY')

    # AWS client
    session = boto3.Session()
    rekognition_client = session.client(
        'rekognition',
        region_name='us-east-2'  # Change region if needed
    )

    # Serial port for Arduino
    ser = serial.Serial('/dev/ttyUSB0', 9600)  # Change port if needed

    # Open the camera
    cap = cv2.VideoCapture(0)

    while True:
        # Read a frame from the camera
        ret, frame = cap.read()
        if not ret:
            break

        # Perform garbage detection on the frame
        sorted_garbage = garbage_detection(frame, rekognition_client, ser)
        
        # Display the sorted garbage on the frame
        y = 20
        for category, items in sorted_garbage.items():
            text = f"{category}: {', '.join(items)}"
            cv2.putText(frame, text, (10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            y += 25

        # Display the frame
        cv2.imshow('Garbage Classification', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the camera and close all OpenCV windows
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
