import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Scanner;
import java.util.Stack;

/**
 * Created by cnzha on 2017/3/30.
 */
public class test2 {



    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        String s = scan.next();
        int[] va = new int[s.length()];
        for(int i = 0; i < va.length; i++) {
            va[i] = 0;
        }
        for (int i = 0; i < va.length; i++) {
            if (s.charAt(i) == '[' && s.charAt(i + 1) == ']') {
                va[i] = 1;
                va[i + 1] = -1;
            }
        }
        boolean done = false;
        while(!done) {

            done = true;
            for (int i = 0; i < s.length(); i++) {

                if (va[i] == 0)
                    done = false;
                if (s.charAt(i) == '[' && va[i] == 0 && va[i + 1] > 0) {
                    va[i] = va[i + 1] + 1;
                }
                if (s.charAt(i) == ']' && va[i] == 0 && va[i - 1] < 0) {
                    va[i] = va[i - 1] - 1;
                }

            }
        }

        int max = va[0];
        for(int i = 0; i < va.length; i++) {
            max = max > va[i] ? max : va[i];
        }

        for(int i = 0; i < va.length; i++) {
            for(int j = 0; j < max-Math.abs(va[i]); j++)
                System.out.print(' ');
            System.out.print('+');
            for(int j = 0; j < Math.abs(va[i]) * 2 - 1; j++)
                System.out.print('-');
            System.out.print('+');
            System.out.println();
            if(va[i] == 1) {
                System.out.println("| |");
                System.out.println();
                System.out.println("| |");
            }
        }
    }
}
