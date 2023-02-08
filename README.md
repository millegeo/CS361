COMMUNICATION CONTRACT:
How to REQUEST data:
PREREQUISITES:
Logged onto OSU servers via Cisco.
Application is deployed on flip server.
STEPS:
1.	To request data simply use a URL call to:
‘http://flip1.engr.oregonstate.edu:10512/translator?message={data to be sent for translation}’
2.	Where {data to be sent for translation} is the information from the blog post to be translated. Expected that information is sent as one string.
Example Call:

<img width="408" alt="image" src="https://user-images.githubusercontent.com/97011313/217668144-aeb79874-b6b0-4e3e-95c8-b152fa44d369.png">


How to Receive Data:
PREREQUISITES:
Logged onto OSU servers via Cisco.
Application is deployed on flip server.
STEPS:
1.	Data will be sent via res.send(data) as one long string.
2.	To receive simply use a request similar to above and the response will be the information that you need. See below for response example for the above request:

![image](https://user-images.githubusercontent.com/97011313/217668212-a4a51923-5125-4eaa-94db-8f8647cc867f.png)


UML Sequence Diagram:
 ![image](https://user-images.githubusercontent.com/97011313/217668007-489b5f9f-17cd-4592-9e90-58caa47e3f90.png)


